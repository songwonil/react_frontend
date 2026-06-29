import { nvl } from '../../../utils/empUtils';

export default function CareerTab({ data, loading, onAdd, onDelete }) {
    return (
        <div className="sub_section">
            <div className="sub_section_title">경력사항</div>
            <div style={{ textAlign: 'right', marginBottom: 4 }}>
                <button className="btn btn_new" onClick={onAdd}>+ 추가</button>
            </div>
            <div className="grid_wrap">
                <table className="grid_table">
                    <thead>
                        <tr>
                            <th>No</th><th>회사명</th><th>부서</th><th>직위</th>
                            <th>입사일</th><th>퇴사일</th><th>담당업무</th><th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} className="text_center">로딩 중...</td></tr>
                        ) : !data || data.length === 0 ? (
                            <tr><td colSpan={8} className="text_center">경력 정보가 없습니다.</td></tr>
                        ) : data.map((row, i) => (
                            <tr key={row.careerId ?? i}>
                                <td className="text_center">{i + 1}</td>
                                <td>{nvl(row.companyNm)}</td>
                                <td>{nvl(row.deptNm)}</td>
                                <td>{nvl(row.positionNm)}</td>
                                <td className="text_center">{nvl(row.joinDt)}</td>
                                <td className="text_center">{nvl(row.resignDt)}</td>
                                <td>{nvl(row.dutyNm)}</td>
                                <td className="text_center">
                                    <button className="btn" onClick={() => onDelete(row.careerId)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
