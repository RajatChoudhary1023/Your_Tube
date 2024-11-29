import downloads from '../Models/downloads.js'

export const downloadscontroller = async (req, res) => {
    const downloadsdata = req.body;
    const addtodownloads = new downloads(downloadsdata)
    try {
        await addtodownloads.save()
        res.status(200).json("added to downloads")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const getalldownloadsvontroller = async (req, res) => {
    try {
        const files = await downloads.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const deletedownloads = async (req, res) => {
    const { videoid: videoid, viewer: viewer } = req.params
    try {
        await downloads.findOneAndDelete({
            videoid:videoid,viewer:viewer,
        })
        res.status(200).json({message:"removed from downloads"})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }

}