import { Request, Response } from "express";
import { SubmissionRepository } from "../repositories/submission.repository";
import { SubmissionService } from "../services/submission.service";
import { SubmissionStatus } from "../models/submission.models";

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);

export const submissionController = {
  async createSubmission(req: Request, res: Response): Promise<void> {
    const submission = await submissionService.createSubmission(req.body);
    res.status(201).json({
      message: "Submission created successfully",
      success: true,
      data: submission,
    });
  },
  async getSubmissionById(req: Request, res: Response): Promise<void> {
    const submission = await submissionService.getSubmissionById(req.params.id);
    res.status(200).json({
      message: "Submission fetched successfully",
      success: true,
      data: submission,
    });
  },
  async getSubmissionsByProblemId(req: Request, res: Response): Promise<void> {
    const submission = await submissionService.getSubmissionsByProblemId(
      req.params.id
    );
    res.status(200).json({
      message: "Submission fetched successfully using problemId",
      success: true,
      data: submission,
    });
  },
  async updateSubmissionStatus(req: Request, res: Response): Promise<void> {
    const { status: SubmissionStatus } = req.body;
    const submission = await submissionService.updateSubmissionStatus(
      req.params.id,
      SubmissionStatus as SubmissionStatus
    );
    res.status(200).json({
      message: "Problem status updated successfully",
      success: true,
      data: submission,
    });
  },
  async deleteSubmissionById(req: Request, res: Response): Promise<void> {
    const submission = await submissionService.deleteSubmissionById(
      req.params.id
    );
    res.status(200).json({
      message: "Submission deleted successfully",
      success: true,
      data: submission,
    });
  },
};
