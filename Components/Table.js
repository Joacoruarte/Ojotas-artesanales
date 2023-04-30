export default function Table ({ rows, columns }) {
  return (
        <table className="w-full border-collapse  rounded-sm">
            <thead>
                <tr className="">
                    {columns?.map((column) => (
                        <th
                            key={column}
                            className="px-4 py-4 underline border-b-2 underline-offset-4 text-center"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows?.map((row, i) => (
                    <tr key={i} className="bg-white">
                        {Object.values(row).map((value, i) => (
                            <td
                                key={i}
                                className="px-4 py-2 border-b-2 text-center"
                            >
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
  )
}
