const { StatusCodes } = require("http-status-codes")
const { NotFoundError, BadRequestError } = require("../error/index")
const Jobs = require('../model/jobs')

const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({"createdBy": req.user._id })
    res.status(StatusCodes.OK).json({jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const {user:{_id}, params:{id:jobId} } = req // destructured, req.users contains userId, req.params contains id

    const job = await Jobs.findOne({"_id": jobId, "createdBy": _id}).exec();

    console.log(`Here is the Job Id: ${job}`);

    if( !job ) {
        console.log('Not found error thrown')
        throw new NotFoundError('Job not found..');
    }

    
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user._id
    console.log(req.body);
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({"msg": "Create job", user: req.user})
}

const updateJob = async (req, res) => {
    const {body:{company, status}, user:{_id}, params:{id:jobId}} = req

    if(!company || !status) {
        throw new BadRequestError('Missing fields either company or status')
    }

    const job = await Jobs.findOneAndUpdate({"_id": jobId, "createdBy": _id}, {company, status}, {new: true, runValidators: true}).exec()

    if(!job) {
        throw new NotFoundError(`Unable to update due to invalid job id: ${jobId}`)
    }
    
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {user:{_id}, params:{id: jobId}} = req

    const job = await Jobs.findOneAndDelete({"_id":jobId, "createdBy":_id}).exec()
    
    if(!job) {
        throw new NotFoundError(`Unable to delete job with job id : ${jobId}`)
    }

    const jobs = await Jobs.find({})
    res.status(StatusCodes.OK).json({jobs, "_count": jobs.length })
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}
