import { nvl } from '../../../utils/empUtils';

export default function EduTab({ data, loading, onAdd, onDelete }) {
    return (
        <div className="sub_section">
            <div className="sub_section_title">학력사항</div>
            <div style={{ textAlign: 'right', marginBottom: 4 }}>
                <button className="btn btn_new" onClick={onAdd}>+ 추가</button>
            </div>
            <div className="grid_wrap">
                <table className="grid_table">
                    <thead>
                        <tr>
                            <th>No</th><th>학교명</th><th>전공</th><th>학력구분</th>
                            <th>입학일</th><th>졸업일</th><th>졸업구분</th><th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} className="text_center">로딩 중...</td></tr>
                        ) : !data || data.length === 0 ? (
                            <tr><td colSpan={8} className="text_center">학력 정보가 없습니다.</td></tr>
                        ) : data.map((row, i) => (
                            <tr key={row.eduId ?? i}>
                                <td className="text_center">{i + 1}</td>
                                <td>{nvl(row.schoolNm)}</td>
                                <td>{nvl(row.major)}</td>
                                <td>{nvl(row.eduLevel)}</td>
                                <td className="text_center">{nvl(row.enterDt)}</td>
                                <td className="text_center">{nvl(row.graduateDt)}</td>
                                <td>{nvl(row.graduateType)}</td>
                                <td className="text_center">
                                    <button className="btn" onClick={() => onDelete(row.eduId)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
