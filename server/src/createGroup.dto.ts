import { GroupMember } from "./groupMember.dto";

export class CreateGroupDTO {
    id: string;
    groupSize: string;
    primaryNumber?: string;
    primaryEmail?: string;
    date: string;
    arrivalDate?: string;
    residence?: string;
    learnedOf?: string;
    madeAppointment?: string;
    groupMembers: Array<GroupMember>;
}