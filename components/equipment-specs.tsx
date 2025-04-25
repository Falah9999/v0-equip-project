import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface EquipmentSpecsProps {
  specs: {
    [key: string]: string | number
  }
  dict: {
    property: string
    value: string
  }
}

export default function EquipmentSpecs({ specs, dict }: EquipmentSpecsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">{dict.property}</TableHead>
          <TableHead>{dict.value}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(specs).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
