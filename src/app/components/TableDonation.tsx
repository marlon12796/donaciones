import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '@/components/ui/table'
import type { Donation } from '../(main)/page'

export const TableDonation = ({ donations }: { donations: Donation[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cantidad</TableHead>
          <TableHead className='text-right'>Mensaje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations?.map((donation) => {
          return (
            <TableRow key={donation.id}>
              <TableCell className='font-bold'>
                {donation.amount.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN'
                })}
              </TableCell>
              <TableCell className='text-right'>{donation.message}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
