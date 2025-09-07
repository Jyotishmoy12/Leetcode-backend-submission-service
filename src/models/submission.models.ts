import mongoose, { Document } from "mongoose";

export enum SubmissionStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPILING = "compiling",
  WRONG_ANSWER = "wrong_answer",
}

export enum SubmissionLanguage {
  CPP = "cpp",
  PYTHON = "python",
}
export interface ISubmission extends Document {
  problemId: string;
  code: string;
  language: SubmissionLanguage;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}
const submissionSchema = new mongoose.Schema<ISubmission>(
  {
    problemId: {
      type: String,
      required: [true, "Problem ID is required"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      enum: Object.values(SubmissionLanguage),
    },
    status: {
      type: String,
      required: true,
      default: SubmissionStatus.PENDING,
      enum: Object.values(SubmissionStatus),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, record) => {
        delete (record as any).__v;
        record.id = record._id;
        delete record._id;
        return record;
      },
    },
  }
);

submissionSchema.index({ status: 1, createdAt: -1 });

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema
);
