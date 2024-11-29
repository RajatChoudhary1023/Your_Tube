import path from 'path';
import fs from 'fs';
import { exec } from 'child_process'; 
import videofile from '../Models/videofile.js';

const execPromise = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(`Error during execution: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error('stderr:', stderr);
            }
            resolve(stdout);
        });
    });
};

export const uploadvideo = async (req, res) => {
    if (req.file === undefined) {
        return res.status(400).json({ message: "Please upload a .mp4 video file only." });
    }

    try {
        const inputVideoPath = req.file.path;
        const outputDir = `uploads/${Date.now()}`;
        const masterPlaylistPath = path.join(outputDir, 'master.m3u8');
        const thumbnailPath = path.join(outputDir, 'thumbnail.jpg');

 
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true }); 
        }

        const generateThumbnailCmd = `ffmpeg -i "${inputVideoPath}" -ss 00:00:02 -vframes 1 -q:v 2 "${thumbnailPath}"`;
        await execPromise(generateThumbnailCmd);


        const resolutions = [
            { resolution: '240p', height: 240, width: 426, range: 500000 },
            { resolution: '360p', height: 360, width: 640, range: 1000000 },
            { resolution: '480p', height: 480, width: 854, range: 1500000 },
            { resolution: '720p', height: 720, width: 1280, range: 2500000 },
            { resolution: '1080p', height: 1080, width: 1920, range: 4000000 },
        ];


        let cmdCommands = '';

        resolutions.forEach(({ resolution, height, width }) => {
            const segmentPattern = path.join(outputDir, `${resolution}_stream_%03d.ts`);
            const outputPath = path.join(outputDir, `${resolution}.m3u8`);
            cmdCommands += `ffmpeg -i "${inputVideoPath}" -vf "scale=${width}:${height}" -c:v libx264 -crf 20 -preset fast -c:a aac -b:a 128k -ac 2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename "${segmentPattern}" "${outputPath}" && `;
        });


        cmdCommands = cmdCommands.slice(0, -3);

        await execPromise(cmdCommands);


        const qualityLevels = resolutions.map(({ resolution, range }) => {
            return `#EXT-X-STREAM-INF:BANDWIDTH=${range},RESOLUTION=${resolutions.find(r => r.resolution === resolution).width}x${resolutions.find(r => r.resolution === resolution).height}\n${resolution}.m3u8`;
        });

        const masterPlaylistContent = [
            '#EXTM3U',
            '#EXT-X-VERSION:3',
            '#EXT-X-MEDIA-SEQUENCE:0',
            ...qualityLevels
        ].join('\n');

        fs.writeFileSync(masterPlaylistPath, masterPlaylistContent);
        console.log(`Master playlist written to: ${masterPlaylistPath}`);

        const file = new videofile({
            videotitle: req.body.title,
            filename: req.file.originalname,
            filepath: masterPlaylistPath,
            filetype: "application/x-mpegURL",
            filesize: fs.statSync(masterPlaylistPath).size,
            videochanel: req.body.chanel,
            uploader: req.body.uploader,
            thumbnail: thumbnailPath,
        });

        await file.save();
        console.log('File saved to database');
        res.status(200).send("File uploaded and converted successfully.");

    } catch (error) {
        console.error('Server-side error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getallvideos = async (req, res) => {
    try {
        const files = await videofile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).json(error.message);
        return;
    }
};
