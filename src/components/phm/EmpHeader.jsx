import { calcYears } from '../../utils/empUtils';

export default function EmpHeader({ form, onChange, onSearch, onSave, onPhotoUpload, onPrint }) {
    return (
        <div className="section_box">
            <div className="section_header">
                <div className="section_title">인사기본사항</div>
                <div className="btn_group">
                    <button className="btn btn_save" onClick={onSave}>&#128190; 인사기록변경</button>
                    <button className="btn" onClick={onPhotoUpload}>&#128247; 사진등록</button>
                    <button className="btn btn_print" onClick={onPrint}>&#128438; 인사기록카드출력</button>
                </div>
            </div>

            <div className="emp_header_wrap">
                <div className="emp_photo_area">
                    <div className="emp_photo_box" onClick={onPhotoUpload} title="클릭하여 사진 등록">
                        {form.photoPath
                            ? <img src={`/insa/${form.photoPath}`} alt="사원사진"
                                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span>사진<br />없음</span>
                        }
                    </div>
                </div>

                <table className="emp_info_table">
                    <colgroup>
                        <col width="70" /><col width="200" /><col width="70" /><col width="200" /><col width="70" /><col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="lbl">성명</td>
                            <td className="val">
                                <div className="search_box">
                                    <input type="text" className="name_last" maxLength={5} placeholder="성"
                                        value={form.empNmLast}
                                        onChange={e => onChange('empNmLast', e.target.value)} />
                                    <input type="text" className="name_first" maxLength={10} placeholder="이름"
                                        value={form.empNmFirst}
                                        onChange={e => onChange('empNmFirst', e.target.value)} />
                                    <button className="btn_search" onClick={onSearch}>&#128269;</button>
                                </div>
                            </td>
                            <td className="lbl">성명(한문)</td>
                            <td className="val">
                                <input type="text" style={{ width: 150 }}
                                    value={form.empNmHanja}
                                    onChange={e => onChange('empNmHanja', e.target.value)} />
                            </td>
                            <td className="lbl">주민번호</td>
                            <td className="val">
                                <input type="text" style={{ width: 120 }} placeholder="000000-0000000"
                                    value={form.empSsn}
                                    onChange={e => onChange('empSsn', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="lbl">근무상태</td>
                            <td className="val">
                                <select style={{ width: 80 }}
                                    value={form.workStatus}
                                    onChange={e => onChange('workStatus', e.target.value)}>
                                    <option value="1">재직</option>
                                    <option value="2">휴직</option>
                                    <option value="3">퇴직</option>
                                </select>
                            </td>
                            <td className="lbl">그룹입사일</td>
                            <td className="val">
                                <input type="text" style={{ width: 100 }} placeholder="YYYY-MM-DD"
                                    value={form.grpJoinDt}
                                    onChange={e => onChange('grpJoinDt', e.target.value)} />
                            </td>
                            <td className="lbl">법인입사일</td>
                            <td className="val">
                                <input type="text" style={{ width: 100 }} placeholder="YYYY-MM-DD"
                                    value={form.corpJoinDt}
                                    onChange={e => onChange('corpJoinDt', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="lbl">소속법인</td>
                            <td className="val">
                                <input type="text" style={{ width: 160 }} readOnly value={form.corpNm} />
                            </td>
                            <td className="lbl">근무SO</td>
                            <td className="val">
                                <input type="text" style={{ width: 120 }}
                                    value={form.workSo}
                                    onChange={e => onChange('workSo', e.target.value)} />
                            </td>
                            <td className="lbl">소속부서</td>
                            <td className="val">
                                <input type="text" style={{ width: 200 }} readOnly value={form.deptNm} />
                            </td>
                        </tr>
                        <tr>
                            <td className="lbl">직위/직책</td>
                            <td className="val">
                                <input type="text" style={{ width: 80 }} placeholder="직위"
                                    value={form.positionNm}
                                    onChange={e => onChange('positionNm', e.target.value)} />
                                {' / '}
                                <input type="text" style={{ width: 80 }} placeholder="직책"
                                    value={form.titleNm}
                                    onChange={e => onChange('titleNm', e.target.value)} />
                            </td>
                            <td className="lbl">휴대폰</td>
                            <td className="val">
                                <input type="text" style={{ width: 120 }} placeholder="010-0000-0000"
                                    value={form.mobileNo}
                                    onChange={e => onChange('mobileNo', e.target.value)} />
                            </td>
                            <td className="lbl">근속년수</td>
                            <td className="val">
                                <span style={{ fontWeight: 'bold', color: '#1a3a8b' }}>
                                    {calcYears(form.corpJoinDt)}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="lbl">사내전화</td>
                            <td className="val">
                                <input type="text" style={{ width: 120 }}
                                    value={form.officeTel}
                                    onChange={e => onChange('officeTel', e.target.value)} />
                            </td>
                            <td className="lbl">자택번호</td>
                            <td className="val">
                                <input type="text" style={{ width: 120 }}
                                    value={form.homeTel}
                                    onChange={e => onChange('homeTel', e.target.value)} />
                            </td>
                            <td className="lbl"></td>
                            <td className="val">
                                <span style={{ color: '#888', fontSize: 11 }}>
                                    {form.empId ? `사번: ${form.empId}` : ''}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
