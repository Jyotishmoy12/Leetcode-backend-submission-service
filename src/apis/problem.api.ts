import axios, { AxiosResponse } from "axios";
import { serverConfig } from "../config";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export interface ITestCase {
  input: string;
  output: string;
}
export interface IProblemDetails {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  editorial?: string;
  testCases: ITestCase[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProblemResponse {
  data: IProblemDetails;
  message: string;
  success: boolean;
}

export async function getProblemById(
  problemId: string
): Promise<IProblemDetails | null> {
  try {
      const response: AxiosResponse<IProblemResponse> = await axios.get(
      `${serverConfig.PROBLEM_SERVICE_URL}/problems/${problemId}`,
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new InternalServerError("failed to fetch problem details");
  } catch (error) {
    logger.info("failed to fetch problem details", error);
    return null;
  }
}
