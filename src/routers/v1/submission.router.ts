import express from "express";
import { validateRequestBody, validateRequestParams } from "../../validators";
import { submissionController } from "../../controllers/submission.controller";
import { createSubmissionSchema, updateSubmissionSchema } from "../../validators/submission.validator";

const submissionRouter = express.Router();


submissionRouter.post(
  "/",
  validateRequestBody(createSubmissionSchema),
  submissionController.createSubmission
);

submissionRouter.get(
  "/:id",
  validateRequestParams(updateSubmissionSchema),
  submissionController.getSubmissionById
);

submissionRouter.get(
  "/problem/:id",
  submissionController.getSubmissionsByProblemId
);

submissionRouter.put(
  "/:id",
  validateRequestParams(updateSubmissionSchema),
  submissionController.updateSubmissionStatus
);

submissionRouter.delete(
  "/:id",
  submissionController.deleteSubmissionById
);


export default submissionRouter;