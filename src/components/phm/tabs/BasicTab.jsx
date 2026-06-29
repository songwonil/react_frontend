export default function BasicTab({ form, onChange }) {
    return (
        <div className="sub_section">
            <div className="sub_section_title">인적사항 상세내용</div>
            <table className="data_table">
                <colgroup>
                    <col width="90" /><col width="220" /><col width="90" /><col width="220" /><col width="90" /><col />
                </colgroup>
                <tbody>
                    <tr>
                        <td className="lbl">한글성명</td>
                        <td>
                            <input type="text" className="w200" readOnly
                                value={form.empNmLast + form.empNmFirst} />
                        </td>
                        <td className="lbl">한자성명</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.empNmHanja}
                                onChange={e => onChange('empNmHanja', e.target.value)} />
                        </td>
                        <td className="lbl">영문명</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.empNmEng}
                                onChange={e => onChange('empNmEng', e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">성별</td>
                        <td>
                            <select className="w100" value={form.empGender}
                                onChange={e => onChange('empGender', e.target.value)}>
                                <option value="">선택</option>
                                <option value="M">남</option>
                                <option value="F">여</option>
                            </select>
                        </td>
                        <td className="lbl">생년월일</td>
                        <td>
                            <input type="text" className="w150" placeholder="YYYY-MM-DD"
                                value={form.empBirthDt}
                                onChange={e => onChange('empBirthDt', e.target.value)} />
                        </td>
                        <td className="lbl">국적</td>
                        <td>
                            <select className="w100" value={form.empNationality}
                                onChange={e => onChange('empNationality', e.target.value)}>
                                <option value="내국인">내국인</option>
                                <option value="외국인">외국인</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">최종학력</td>
                        <td>
                            <select className="w150" value={form.eduLevel}
                                onChange={e => onChange('eduLevel', e.target.value)}>
                                <option value="">선택</option>
                                <option value="고졸">고졸</option>
                                <option value="전문대졸">전문대졸</option>
                                <option value="대학교졸">대학교졸</option>
                                <option value="대학원졸">대학원졸</option>
                                <option value="박사">박사</option>
                            </select>
                        </td>
                        <td className="lbl">직무구분</td>
                        <td>
                            <input type="text" className="w150"
                                value={form.jobType}
                                onChange={e => onChange('jobType', e.target.value)} />
                        </td>
                        <td className="lbl">담당업무</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.dutyNm}
                                onChange={e => onChange('dutyNm', e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">회사이메일</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.corpEmail}
                                onChange={e => onChange('corpEmail', e.target.value)} />
                        </td>
                        <td className="lbl">개인이메일</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.personalEmail}
                                onChange={e => onChange('personalEmail', e.target.value)} />
                        </td>
                        <td className="lbl">보훈/장애여부</td>
                        <td>
                            보훈&nbsp;
                            <select style={{ width: 55 }} value={form.veteranYn}
                                onChange={e => onChange('veteranYn', e.target.value)}>
                                <option value="N">N</option>
                                <option value="Y">Y</option>
                            </select>
                            &nbsp;&nbsp;장애&nbsp;
                            <select style={{ width: 55 }} value={form.disabilityYn}
                                onChange={e => onChange('disabilityYn', e.target.value)}>
                                <option value="N">N</option>
                                <option value="Y">Y</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">동호회</td>
                        <td>
                            <input type="text" className="w200"
                                value={form.clubNm}
                                onChange={e => onChange('clubNm', e.target.value)} />
                        </td>
                        <td className="lbl">결혼정보</td>
                        <td>
                            <select className="w100" value={form.maritalStatus}
                                onChange={e => onChange('maritalStatus', e.target.value)}>
                                <option value="">선택</option>
                                <option value="미혼">미혼</option>
                                <option value="기혼">기혼</option>
                                <option value="이혼">이혼</option>
                                <option value="사별">사별</option>
                            </select>
                        </td>
                        <td className="lbl">본적</td>
                        <td>
                            <input type="text" className="w300"
                                value={form.hometown}
                                onChange={e => onChange('hometown', e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">현주소</td>
                        <td colSpan={5}>
                            <input type="text" style={{ width: 500 }}
                                value={form.homeAddr}
                                onChange={e => onChange('homeAddr', e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
