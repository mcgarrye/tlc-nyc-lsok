import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { GroupMember } from './IndividualQuestions';

interface groupMembersTableProps{
    groupMembers: GroupMember[]
}

export default function GroupMembersTable({groupMembers}: groupMembersTableProps) {
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Primary Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupMembers.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.sex}</TableCell>
              <TableCell>{row.primaryLanguage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
