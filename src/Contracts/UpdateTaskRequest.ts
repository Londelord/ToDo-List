import CreateTaskRequest from "./CreateTaskRequest.ts";

interface UpdateTaskRequest {
    id: number;
    createTaskRequest: CreateTaskRequest;
}

export default UpdateTaskRequest;