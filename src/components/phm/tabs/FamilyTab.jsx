import { nvl } from '../../../utils/empUtils';

export default function FamilyTab({ data, loading, onAdd, onDelete }) {
    return (
        <div className="sub_section">
            <div className="sub_section_title">가족사항</div>
            <div style={{ textAlign: 'right', marginBottom: 4 }}>
                <button className="btn btn_new" onClick={onAdd}>+ 추가</button>
            </div>
            <div className="grid_wrap">
                <table className="grid_table">
                    <thead>
                        <tr>
                            <th>No</th><th>관계</th><th>성명</th><th>성별</th>
                            <th>생년월일</th><th>동거여부</th><th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} className="text_center">로딩 중...</td></tr>
                        ) : !data || data.length === 0 ? (
                            <tr><td colSpan={7} className="text_center">가족 정보가 없습니다.</td></tr>
                        ) : data.map((row, i) => (
                            <tr key={row.familyId ?? i}>
                                <td className="text_center">{i + 1}</td>
                                <td>{nvl(row.relation)}</td>
                                <td>{nvl(row.familyNm)}</td>
                                <td className="text_center">
                                    {row.familyGender === 'M' ? '남' : row.familyGender === 'F' ? '여' : ''}
                                </td>
                                <td className="text_center">{nvl(row.familyBirthDt)}</td>
                                <td className="text_center">{row.liveTogether === 'Y' ? '동거' : '별거'}</td>
                                <td className="text_center">
                                    <button className="btn" onClick={() => onDelete(row.familyId)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
