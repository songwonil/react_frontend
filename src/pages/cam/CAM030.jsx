import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchModal from '../../components/phm/SearchModal';
import CodeSearchModal from '../../components/common/CodeSearchModal';
import DeptSearchModal from '../../components/common/DeptSearchModal';
import { apiFetch as empApiFetch } from '../../utils/empUtils';

const BASE_URL = '/insa/cam/CAM_030_data.jsp';

function nvl(v, d = '') {
    return (v === null || v === undefined || v === '') ? d : String(v);
}

async function apiFetch(params) {
    const { data } = await axios.get(BASE_URL, { params });
    return data;
}

async function apiPost(params) {
    const body = new URLSearchParams(params).toString();
    const { data } = await axios.post(BASE_URL, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return data;
}

const EMPTY_DETAIL = {
    camHistoryId: '', empId: '', empNo: '', empNm: '',
    ssnNo: '', companyCd: '', posGrdCd: '',  // posGrdCd: 담당지점(SO) [PHM_POS_GRD_CD]
    staDt: new Date().toISOString().slice(0, 10),
    typeCd: '', cauCd: '', orgCd: '', orgNm: '', jobNm: '',
    posCd: '', dutyCd: '', empKindCd: '', yearnum: '', reasonCd: '', // reasonCd: 채용구분 [CAM_REASON_CD]
    sendNm: '', sendYn: 'N',  // sendYn: 겸직여부 [SEND_YN]
    restYn: 'N', renDt: '', babyDt: '', conDt: '',
    disYn: 'N', disKindCd: '', disRtnDt: '',
    disOrgCd: '', disOrgNm: '', disPosCd: '', disDutyCd: '', disPosGrdCd: '',
    note: '', outNote: '',
};

const EMPTY_CODES = {};

export default function CAM030() {
    const [srch, setSrch] = useState({
        fromDt: '2026-06-01', toDt: '2026-07-01',
        orgNm: '', orgCd: '', typeCd: '', empNm: '',
    });
    const [list, setList]         = useState([]);
    const [selIdx, setSelIdx]     = useState(-1);
    const [form, setForm]         = useState(EMPTY_DETAIL);
    const [codes, setCodes]       = useState(EMPTY_CODES);
    const [searchOpen, setSearchOpen] = useState(false);
    // { cdKind, cdKindNm, field } — 코드 검색 팝업
    const [codeSearch, setCodeSearch] = useState(null);
    // { field, nmField } | { isSrch: true } — 부서 검색 팝업
    const [deptSearch, setDeptSearch] = useState(null);

    useEffect(() => {
        apiFetch({ action: 'getCodes' })
            .then(data => { if (data && !data.error) setCodes(data); })
            .catch(() => {});
    }, []);

    const updateSrch = (field, value) => setSrch(prev => ({ ...prev, [field]: value }));
    const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSearch = useCallback(async () => {
        try {
            const data = await apiFetch({
                action: 'search',
                fromDt: srch.fromDt, toDt: srch.toDt,
                orgCd: srch.orgCd, typeCd: srch.typeCd, empNm: srch.empNm,
            });
            setList(Array.isArray(data) ? data : []);
            setSelIdx(-1);
            setForm(EMPTY_DETAIL);
        } catch {
            alert('조회 중 오류가 발생했습니다.');
        }
    }, [srch]);

    const handleRowClick = (row, idx) => {
        setSelIdx(idx);
        setForm({
            camHistoryId: nvl(row.camHistoryId),
            empId:        nvl(row.empId),
            empNo:        nvl(row.empNo),
            empNm:        nvl(row.empNm),
            ssnNo:        nvl(row.ssnNo),   // 주민번호 PHM_EMP_C.CTZ_NO
            companyCd:    nvl(row.companyCd),
            posGrdCd:     nvl(row.posGrdCd),   // 담당지점(SO) [PHM_POS_GRD_CD]
            staDt:        nvl(row.staDt),
            typeCd:       nvl(row.typeCd),
            cauCd:        nvl(row.cauCd),
            orgCd:        nvl(row.orgCd),
            orgNm:        nvl(row.orgNm),
            jobNm:        nvl(row.jobCd),
            posCd:        nvl(row.posCd),
            dutyCd:       nvl(row.dutyCd),
            empKindCd:    nvl(row.empKindCd),
            yearnum:      nvl(row.yearnum),
            reasonCd:     nvl(row.reasonCd),   // 채용구분 [CAM_REASON_CD]
            sendNm:       '',
            sendYn:       nvl(row.sendYn, 'N'),   // 겸직여부 [SEND_YN]
            restYn:       nvl(row.restYn, 'N'),
            renDt:        nvl(row.renDt),
            babyDt:       nvl(row.babyDt),
            conDt:        nvl(row.conDt),
            disYn:        nvl(row.disYn, 'N'),
            disKindCd:    nvl(row.disKindCd),
            disRtnDt:     nvl(row.disRtnDt),
            disOrgCd:     nvl(row.disOrgCd),
            disOrgNm:     '',
            disPosCd:     nvl(row.disPosCd),
            disDutyCd:    nvl(row.disDutyCd),
            disPosGrdCd:  nvl(row.disPosGrdCd),
            note:         nvl(row.note),
            outNote:      nvl(row.outNote),
        });
    };

    const handleNew = () => {
        setSelIdx(-1);
        setForm({ ...EMPTY_DETAIL, staDt: new Date().toISOString().slice(0, 10) });
    };

    const handleDelete = async () => {
        if (!form.camHistoryId) { alert('삭제할 발령내역을 선택하세요.'); return; }
        if (!confirm('선택한 발령내역을 삭제하시겠습니까?')) return;
        try {
            const data = await apiPost({ action: 'delete', camHistoryId: form.camHistoryId });
            if (data.result === 'error') { alert('삭제 실패: ' + data.message); return; }
            alert('삭제되었습니다.');
            await handleSearch();
        } catch { alert('삭제 중 오류가 발생했습니다.'); }
    };

    const handleSave = async () => {
        if (!form.empId)   { alert('사번을 입력해 주세요.'); return; }
        if (!form.staDt)   { alert('발령일자를 입력해 주세요.'); return; }
        if (!form.typeCd)  { alert('발령유형을 선택해 주세요.'); return; }
        if (!confirm('저장하시겠습니까?')) return;
        try {
            const data = await apiPost({
                action: 'save',
                camHistoryId: form.camHistoryId || '0',
                empId: form.empId,
                staDt: form.staDt,
                typeCd: form.typeCd,
                cauCd: form.cauCd,
                companyCd: form.companyCd,
                orgCd: form.orgCd,
                posCd: form.posCd,
                dutyCd: form.dutyCd,
                posGrdCd: form.posGrdCd,
                jobCd: form.jobNm,
                empKindCd: form.empKindCd,
                yearnum: form.yearnum,
                reasonCd: form.reasonCd,
                sendNm: form.sendNm,
                restYn: form.restYn,
                renDt: form.renDt,
                babyDt: form.babyDt,
                conDt: form.conDt,
                disYn: form.disYn,
                disKindCd: form.disKindCd,
                disRtnDt: form.disRtnDt,
                disOrgCd: form.disOrgCd,
                disPosCd: form.disPosCd,
                disDutyCd: form.disDutyCd,
                disPosGrdCd: form.disPosGrdCd,
                note: form.note,
                outNote: form.outNote,
            });
            if (data.result === 'error') { alert('저장 실패: ' + data.message); return; }
            alert('저장되었습니다.');
            await handleSearch();
        } catch { alert('저장 중 오류가 발생했습니다.'); }
    };

    const openCode = (cdKind, cdKindNm, field) =>
        setCodeSearch({ cdKind, cdKindNm, field });

    const handleCodeSelect = useCallback(({ cd }) => {
        if (codeSearch) updateForm(codeSearch.field, cd);
        setCodeSearch(null);
    }, [codeSearch]);

    const handleDeptSelect = useCallback(({ orgCd, orgNm }) => {
        if (deptSearch?.isSrch) {
            updateSrch('orgCd', orgCd);
            updateSrch('orgNm', orgNm);
        } else if (deptSearch) {
            updateForm(deptSearch.field, orgCd);
            updateForm(deptSearch.nmField, orgNm);
        }
        setDeptSearch(null);
    }, [deptSearch]);

    const handleEmpSelect = useCallback(async (empId) => {
        setSearchOpen(false);
        try {
            const d = await empApiFetch({ action: 'getEmp', empId });
            if (d.error) { alert(d.error); return; }
            setForm(prev => ({
                ...prev,
                empId:     String(nvl(d.empId)),
                empNo:     nvl(d.empNo),
                empNm:     nvl(d.empNm),
                ssnNo:     nvl(d.empSsn),   // 주민번호 PHM_EMP_C.CTZ_NO
                companyCd: nvl(d.corpCd),
            }));
        } catch {
            alert('사원 정보를 불러올 수 없습니다.');
        }
    }, []);

    const Req = () => <span style={{ color: '#c00' }}>•</span>;

    const codeOpts = (list) => list.map(c => (
        <option key={c.cd} value={c.cd}>{c.cdNm}</option>
    ));

    return (
        <>
            {/* 브레드크럼 */}
            <div className="breadcrumb">
                <a href="#">인력운영</a>
                <span className="sep">›</span>
                <a href="#">발령관리</a>
                <span className="sep">›</span>
                <span className="current">발령내역관리</span>
                <span className="page_code">CAM_030</span>
                <button className="btn_del"
                    onClick={() => { if (confirm('탭을 닫겠습니까?')) history.back(); }}>
                    del ×
                </button>
            </div>

            {/* 검색 영역 */}
            <div className="section_box" style={{ marginBottom: 5 }}>
                <div className="search_form">
                    <span className="s_label"><Req />발령일자</span>
                    <input type="date" value={srch.fromDt}
                        onChange={e => updateSrch('fromDt', e.target.value)}
                        style={{ width: 120 }} />
                    <span style={{ color: '#666' }}>~</span>
                    <input type="date" value={srch.toDt}
                        onChange={e => updateSrch('toDt', e.target.value)}
                        style={{ width: 120 }} />

                    <span className="s_label" style={{ marginLeft: 10 }}>발령부서</span>
                    <input type="text" value={srch.orgNm} readOnly
                        style={{ width: 90 }} placeholder="부서 선택" />
                    <button className="btn"
                        onClick={() => setDeptSearch({ isSrch: true })}>🔍</button>

                    <span className="s_label" style={{ marginLeft: 8 }}>발령유형</span>
                    <select value={srch.typeCd} onChange={e => updateSrch('typeCd', e.target.value)}
                        style={{ height: 20, fontSize: 11, border: '1px solid #aab', padding: '0 3px', width: 100 }}>
                        <option value="">전체</option>
                        {codeOpts(codes['CAM_TYPE_CD'] || [])}
                    </select>

                    <span className="s_label" style={{ marginLeft: 8 }}>사&nbsp;&nbsp;&nbsp;원</span>
                    <input type="text" value={srch.empNm}
                        onChange={e => updateSrch('empNm', e.target.value)}
                        style={{ width: 90 }} placeholder="성명" />
                    <button className="btn"
                        onClick={() => setSearchOpen(true)}>🔍</button>

                    <button className="btn btn_search" style={{ marginLeft: 10 }}
                        onClick={handleSearch}>
                        🔍 조회
                    </button>
                </div>
            </div>

            {/* 발령자 리스트 */}
            <div className="section_box" style={{ marginBottom: 5 }}>
                <div className="section_header">
                    <span className="section_title">발령자 리스트</span>
                </div>
                <div className="grid_wrap" style={{ maxHeight: 200, overflowY: 'auto' }}>
                    <table className="grid_table" style={{ minWidth: 900 }}>
                        <thead>
                            <tr>
                                <th style={{ width: 35 }}>No</th>
                                <th style={{ width: 80 }}>발령일자</th>
                                <th style={{ width: 70 }}>사원번호</th>
                                <th style={{ width: 65 }}>성명</th>
                                <th style={{ width: 80 }}>발령유형</th>
                                <th style={{ width: 80 }}>발령사유</th>
                                <th>발령부서</th>
                                <th style={{ width: 65 }}>발령직위</th>
                                <th style={{ width: 65 }}>발령직책</th>
                                <th style={{ width: 65 }}>발령직무</th>
                                <th style={{ width: 80 }}>담당지점</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="text_center"
                                        style={{ padding: 20, color: '#888' }}>
                                        조회 결과가 없습니다.
                                    </td>
                                </tr>
                            ) : list.map((row, idx) => (
                                <tr key={idx}
                                    className={selIdx === idx ? 'selected' : ''}
                                    onClick={() => handleRowClick(row, idx)}>
                                    <td className="text_center">{idx + 1}</td>
                                    <td className="text_center">{row.staDt}</td>
                                    <td className="text_center">{row.empNo}</td>
                                    <td>{row.empNm}</td>
                                    <td>{row.typeNm}</td>
                                    <td>{row.cauNm}</td>
                                    <td>{row.orgNm}</td>
                                    <td>{row.posNm}</td>
                                    <td>{row.dutyNm}</td>
                                    <td>{row.jobNm}</td>
                                    <td>{row.posGrdNm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{
                    textAlign: 'right', padding: '3px 8px', fontSize: 11, color: '#446',
                    borderTop: '1px solid #c8d8e8', background: '#f8fafc',
                }}>
                    [{list.length} / {list.length}]
                </div>
            </div>

            {/* 사원 검색 모달 */}
            {searchOpen && (
                <SearchModal
                    initNm={form.empNm}
                    onClose={() => setSearchOpen(false)}
                    onSelect={handleEmpSelect}
                />
            )}

            {/* 코드 검색 모달 */}
            {codeSearch && (
                <CodeSearchModal
                    cdKind={codeSearch.cdKind}
                    cdKindNm={codeSearch.cdKindNm}
                    onClose={() => setCodeSearch(null)}
                    onSelect={handleCodeSelect}
                />
            )}

            {/* 부서 검색 모달 */}
            {deptSearch && (
                <DeptSearchModal
                    onClose={() => setDeptSearch(null)}
                    onSelect={handleDeptSelect}
                />
            )}

            {/* 발령 세부내용 */}
            <div className="section_box">
                <div className="section_header">
                    <span className="section_title">발령 세부내용</span>
                    <div className="btn_group">
                        <button className="btn" onClick={handleNew}>입력</button>
                        <button className="btn" onClick={handleDelete}>삭제</button>
                        <button className="btn btn_save" onClick={handleSave}>저장</button>
                    </div>
                </div>
                <div style={{ padding: '6px 8px' }}>
                    <table className="data_table">
                        <colgroup>
                            <col width="85" /><col /><col width="85" /><col /><col width="90" /><col />
                        </colgroup>
                        <tbody>
                            {/* Row 1: 사번 / 주민번호 / 발령인사영역 */}
                            <tr>
                                <td className="lbl"><Req />사번</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <input type="text" style={{ width: 70 }} value={form.empNo} readOnly
                                            placeholder="사원번호" />
                                        <input type="text" style={{ width: 80 }} value={form.empNm} readOnly
                                            placeholder="성명" />
                                        <button className="btn"
                                            onClick={() => setSearchOpen(true)}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl">주민번호</td>
                                <td>
                                    <input type="text" className="w150" value={form.ssnNo} readOnly
                                        placeholder="사원 선택 시 자동" />
                                </td>
                                <td className="lbl">발령인사영역</td>
                                <td>
                                    <input type="text" className="w150" value={form.companyCd} readOnly />
                                </td>
                            </tr>

                            {/* Row 2: 발령일자 / 발령유형 / 발령사유 */}
                            <tr>
                                <td className="lbl"><Req />발령일자</td>
                                <td>
                                    <input type="date" style={{ width: 130 }} value={form.staDt}
                                        onChange={e => updateForm('staDt', e.target.value)} />
                                </td>
                                <td className="lbl"><Req />발령유형</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.typeCd}
                                            onChange={e => updateForm('typeCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['CAM_TYPE_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('CAM_TYPE_CD', '발령유형', 'typeCd')}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl">발령사유</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.cauCd}
                                            onChange={e => updateForm('cauCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['CAM_CAU_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('CAM_CAU_CD', '발령사유', 'cauCd')}>🔍</button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 3: 부서 / 담당지점(SO) / 직위 */}
                            <tr>
                                <td className="lbl"><Req />부서</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <input type="text" style={{ width: 130 }} value={form.orgNm} readOnly placeholder="부서 선택" />
                                        <button className="btn"
                                            onClick={() => setDeptSearch({ field: 'orgCd', nmField: 'orgNm' })}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl"><Req />담당지점(SO)</td>
                                <td>
                                    <select className="w150" value={form.posGrdCd}
                                        onChange={e => updateForm('posGrdCd', e.target.value)}>
                                        <option value="">선택</option>
                                        {codeOpts(codes['PHM_POS_GRD_CD'] || [])}
                                    </select>
                                </td>
                                <td className="lbl"><Req />직위</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.posCd}
                                            onChange={e => updateForm('posCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['PHM_POS_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('PHM_POS_CD', '직위', 'posCd')}>🔍</button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 4: 직무 / 직책 / 호봉 */}
                            <tr>
                                <td className="lbl"><Req />직무</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.jobNm}
                                            onChange={e => updateForm('jobNm', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['PHM_JOB_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('PHM_JOB_CD', '직무', 'jobNm')}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl"><Req />직책</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.dutyCd}
                                            onChange={e => updateForm('dutyCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['PHM_CALL_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('PHM_CALL_CD', '직책', 'dutyCd')}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl">호봉</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w100" value={form.yearnum}
                                            onChange={e => updateForm('yearnum', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['PHM_HOBONG'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('PHM_HOBONG', '호봉', 'yearnum')}>🔍</button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 5: 직원구분 / 채용구분 / 겸직내역 */}
                            <tr>
                                <td className="lbl"><Req />직원구분</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.empKindCd}
                                            onChange={e => updateForm('empKindCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['PHM_EMP_KIND_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('PHM_EMP_KIND_CD', '직원구분', 'empKindCd')}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl">채용구분</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                        <select className="w150" value={form.reasonCd}
                                            onChange={e => updateForm('reasonCd', e.target.value)}>
                                            <option value="">선택</option>
                                            {codeOpts(codes['CAM_REASON_CD'] || [])}
                                        </select>
                                        <button className="btn" onClick={() => openCode('CAM_REASON_CD', '채용구분', 'reasonCd')}>🔍</button>
                                    </div>
                                </td>
                                <td className="lbl">겸직내역</td>
                                <td>
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: form.sendYn === 'Y' ? '#c00' : '#666',
                                    }}>
                                        {form.sendYn === 'Y' ? '유' : '무'}
                                    </span>
                                </td>
                            </tr>

                            {/* Row 6: 휴직내역 */}
                            <tr>
                                <td className="lbl">휴직내역</td>
                                <td colSpan={5}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            휴직여부
                                            <input type="checkbox" checked={form.restYn === 'Y'}
                                                onChange={e => updateForm('restYn', e.target.checked ? 'Y' : 'N')} />
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            복직예정일
                                            <input type="date" value={form.renDt}
                                                onChange={e => updateForm('renDt', e.target.value)}
                                                style={{ width: 120 }} />
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            출산예정일
                                            <input type="date" value={form.babyDt}
                                                onChange={e => updateForm('babyDt', e.target.value)}
                                                style={{ width: 120 }} />
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            계약종료예정일
                                            <input type="date" value={form.conDt}
                                                onChange={e => updateForm('conDt', e.target.value)}
                                                style={{ width: 120 }} />
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 7: 파견내역 */}
                            <tr>
                                <td className="lbl">파견내역</td>
                                <td colSpan={5}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            파견여부
                                            <input type="checkbox" checked={form.disYn === 'Y'}
                                                onChange={e => updateForm('disYn', e.target.checked ? 'Y' : 'N')} />
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            구분
                                            <select style={{ height: 18, fontSize: 11, border: '1px solid #aab', width: 80 }}
                                                value={form.disKindCd}
                                                onChange={e => updateForm('disKindCd', e.target.value)}>
                                                <option value="">선택</option>
                                                {codeOpts(codes['CAM_DIS_KIND_CD'] || [])}
                                            </select>
                                            <button className="btn" style={{ height: 18, fontSize: 10, padding: '0 4px' }}
                                                onClick={() => openCode('CAM_DIS_KIND_CD', '파견구분', 'disKindCd')}>🔍</button>
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            복귀예정일
                                            <input type="date" value={form.disRtnDt}
                                                onChange={e => updateForm('disRtnDt', e.target.value)}
                                                style={{ width: 120 }} />
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            파견부서
                                            <input type="text" value={form.disOrgNm} readOnly style={{ width: 70 }} placeholder="부서 선택" />
                                            <button className="btn"
                                                onClick={() => setDeptSearch({ field: 'disOrgCd', nmField: 'disOrgNm' })}>🔍</button>
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            파견지점
                                            <select style={{ height: 18, fontSize: 11, border: '1px solid #aab', width: 90 }}
                                                value={form.disPosGrdCd}
                                                onChange={e => updateForm('disPosGrdCd', e.target.value)}>
                                                <option value="">선택</option>
                                                {codeOpts(codes['PHM_POS_GRD_CD'] || [])}
                                            </select>
                                            <button className="btn" style={{ height: 18, fontSize: 10, padding: '0 4px' }}
                                                onClick={() => openCode('PHM_POS_GRD_CD', '파견지점', 'disPosGrdCd')}>🔍</button>
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            파견직위
                                            <select style={{ height: 18, fontSize: 11, border: '1px solid #aab', width: 80 }}
                                                value={form.disPosCd}
                                                onChange={e => updateForm('disPosCd', e.target.value)}>
                                                <option value="">선택</option>
                                                {codeOpts(codes['PHM_POS_CD'] || [])}
                                            </select>
                                            <button className="btn" style={{ height: 18, fontSize: 10, padding: '0 4px' }}
                                                onClick={() => openCode('PHM_POS_CD', '파견직위', 'disPosCd')}>🔍</button>
                                        </label>
                                        <span style={{ color: '#aab' }}>/</span>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                                            파견직책
                                            <select style={{ height: 18, fontSize: 11, border: '1px solid #aab', width: 80 }}
                                                value={form.disDutyCd}
                                                onChange={e => updateForm('disDutyCd', e.target.value)}>
                                                <option value="">선택</option>
                                                {codeOpts(codes['PHM_CALL_CD'] || [])}
                                            </select>
                                            <button className="btn" style={{ height: 18, fontSize: 10, padding: '0 4px' }}
                                                onClick={() => openCode('PHM_CALL_CD', '파견직책', 'disDutyCd')}>🔍</button>
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 8: 비고 / 퇴직처 */}
                            <tr>
                                <td className="lbl">비고</td>
                                <td colSpan={3}>
                                    <input type="text" style={{ width: '98%' }} value={form.note}
                                        onChange={e => updateForm('note', e.target.value)} />
                                </td>
                                <td className="lbl">퇴직처</td>
                                <td>
                                    <input type="text" className="w150" value={form.outNote}
                                        onChange={e => updateForm('outNote', e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
