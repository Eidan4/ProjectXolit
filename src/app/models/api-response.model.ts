import { Parameter } from "./parameter.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  statsCode: number;
  errors: String[];
  parameters: Parameter[];
}
