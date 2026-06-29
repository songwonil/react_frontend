import { nvl } from '../../../utils/empUtils';

export default function AppointTab({ data, loading }) {
    return (
        <div className="sub_section">
            <div className="sub_section_title">발령 이력</div>
            <div className="grid_wrap">
                <table className="grid_table">
                    <thead>
                        <tr>
                            <th>No</th><th>발령일</th><th>발령종류</th><th>이전부서</th>
                            <th>발령부서</th><th>이전직위</th><th>발령직위</th><th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} className="text_center">로딩 중...</td></tr>
                        ) : !data || data.length === 0 ? (
                            <tr><td colSpan={8} className="text_center">발령 이력이 없습니다.</td></tr>
                        ) : data.map((row, i) => (
                            <tr key={row.appointId ?? i}>
                                <td className="text_center">{i + 1}</td>
                                <td className="text_center">{nvl(row.appointDt)}</td>
                                <td>{nvl(row.appointType)}</td>
                                <td>{nvl(row.fromDeptNm)}</td>
                                <td>{nvl(row.toDeptNm)}</td>
                                <td>{nvl(row.fromPosition)}</td>
                                <td>{nvl(row.toPosition)}</td>
                                <td>{nvl(row.remark)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
