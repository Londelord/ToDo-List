import Attributes from "./Attributes";
import Status from "./Status.ts";

class Task {
    id: number;
    attributes: Attributes;

    constructor(id: number, attributes: Attributes) {
        this.id = id;
        this.attributes = attributes;
    }

    static fromApi(data: any): Task {
        return new Task(data.id, {
            createdAt: new Date(data.attributes.createdAt),
            description: data.attributes.description,
            publishedAt: new Date(data.attributes.publishedAt),
            status: Task.getEnumStatus(data.attributes.status),
            title: data.attributes.title,
            updatedAt: new Date(data.attributes.updatedAt),
        });
    }

    static getEnumStatus(status: string): Status {
        switch (status) {
            case "0":
                return Status.Incomplete;
            case "1":
                return Status.Completed;
            case "2":
                return Status.FavoriteIncomplete;
            case "3":
                return Status.FavoriteCompleted;
            default:
                    return Status.Incomplete;
        }
    }

    static getStringStatus(status: Status): string {
        switch (status) {
            case Status.Incomplete:
                return "0";
            case Status.Completed:
                return "1";
            case Status.FavoriteIncomplete:
                return "2";
            case Status.FavoriteCompleted:
                return "3";
            default:
                return "0";
        }
    }
}

export default Task;