
interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  renderCell?: (item: any, column: Column) => React.ReactNode;
}

export function DataTable({ data, columns, renderCell }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {renderCell ? renderCell(item, column) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
