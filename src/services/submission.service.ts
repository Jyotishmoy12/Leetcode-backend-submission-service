import { ISubmission, SubmissionStatus } from "../models/submission.models";
import { ISubmissionRepository } from "../repositories/submission.repository";
import { NotFoundError } from "../utils/errors/app.error";

export interface ISubmissionService {
    createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission>;
    getSubmissionById(id: string): Promise<ISubmission | null>;
    getSubmissionsByProblemId(problemId: string): Promise<ISubmission[]>;
    deleteSubmissionById(id: string): Promise<boolean>;
    updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<ISubmission | null>;
}

export class SubmissionService implements ISubmissionService {
    constructor(private submissionRepository: ISubmissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    async createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission> {
        // check if the problem exists or not --> call the problem service

        // add the submission payload to the db

        // submission to redis queue
    }

    async getSubmissionById(id: string): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.findById(id);
        if(!submission){
            throw new NotFoundError(`Submission with id ${id} not found`);
        }
        return submission;
    }

    async getSubmissionsByProblemId(problemId: string): Promise<ISubmission[]> {
        const submissions = await this.submissionRepository.findByProblemId(problemId);
        return submissions;
    }

    async deleteSubmissionById(id: string): Promise<boolean> {
        const result = await this.submissionRepository.deleteById(id);
        if(!result){
            throw new NotFoundError(`Submission with id ${id} not found to delete`);
        }
        return result;
    }

    async updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.updateStatus(id, status);
        if(!submission){
            throw new NotFoundError(`Submission with id ${id} not found to update status`);
        }
        return submission;
    }
}