import { z } from "zod";
import { SubmissionLanguage, SubmissionStatus } from "../models/submission.models";

export const createSubmissionSchema = z.object({
  problemId: z.string().min(1),
  language: z.enum([SubmissionLanguage.CPP, SubmissionLanguage.PYTHON]),
  code: z.string().min(1),
  status: z
    .enum([
      SubmissionStatus.PENDING,
      SubmissionStatus.ACCEPTED,
      SubmissionStatus.REJECTED,
      SubmissionStatus.COMPILING,
      SubmissionStatus.WRONG_ANSWER,
    ])
});

export const updateSubmissionSchema = z.object({
  problemId: z.string().min(1).optional(),
  language: z.enum([SubmissionLanguage.CPP, SubmissionLanguage.PYTHON]).optional(),
  code: z.string().min(1).optional(),
  status: z
    .enum([
      SubmissionStatus.PENDING,
      SubmissionStatus.ACCEPTED,
      SubmissionStatus.REJECTED,
      SubmissionStatus.COMPILING,
      SubmissionStatus.WRONG_ANSWER,
    ])
    .optional(),
});
export const findByStatusSchema = z.object({
  status: z.enum([
    SubmissionStatus.PENDING,
    SubmissionStatus.ACCEPTED,
    SubmissionStatus.REJECTED,
    SubmissionStatus.COMPILING,
    SubmissionStatus.WRONG_ANSWER,
  ]),
});
export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;
export type UpdateSubmissionDto = z.infer<typeof updateSubmissionSchema>;
export type FindByStatusDto = z.infer<typeof findByStatusSchema>;
