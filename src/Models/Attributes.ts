import Status from "./Status.ts";

interface Attributes {
    createdAt: Date;
    description: string;
    publishedAt: Date;
    status: Status;
    title: string;
    updatedAt: Date;
}

export default Attributes;