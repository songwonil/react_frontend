import { useState, useEffect, useCallback } from 'react';
import { nvl, apiFetch } from '../../utils/empUtils';

export default function SearchModal({ initNm = '', onClose, onSelect }) {
    const [nm, setNm]           = useState(initNm);
    const [status, setStatus]   = useState('1');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const doSearch = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiFetch({ action: 'search', nm, status });
            setResults(Array.isArray(data) ? data : []);
        } catch {
            alert('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [nm, status]);

    useEffect(() => { doSearch(); }, []);

    return (
        <div
            className="modal_overlay open"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="modal_box" style={{ minWidth: 500 }}>
                <div className="modal_header">
                    직원 검색
                    <button className="modal_close" onClick={onClose}>✕</button>
                </div>
                <div className="modal_body">
                    <div className="search_form" style={{ marginBottom: 8 }}>
                        <span className="s_label">성명</span>
                        <input
                            type="text" value={nm} style={{ width: 120 }} placeholder="성명 입력"
                            onChange={e => setNm(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && doSearch()}
                        />
                        <span className="s_label">근무상태</span>
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="">전체</option>
                            <option value="1">재직</option>
                            <option value="2">휴직</option>
                            <option value="3">퇴직</option>
                        </select>
                        <button className="btn btn_save" onClick={doSearch}>검색</button>
                    </div>
                    <div className="grid_wrap" style={{ maxHeight: 300, overflowY: 'auto' }}>
                        <table className="grid_table">
                            <thead>
                                <tr>
                                    <th>사번</th><th>성명</th><th>부서</th><th>직위</th><th>근무상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="text_center">검색 중...</td></tr>
                                ) : results.length === 0 ? (
                                    <tr><td colSpan={5} className="text_center">검색 결과가 없습니다.</td></tr>
                                ) : results.map(row => {
                                    const sNm = row.workStatus === '1' ? '재직'
                                              : row.workStatus === '2' ? '휴직' : '퇴직';
                                    return (
                                        <tr
                                            key={row.empId}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => onSelect(row.empId)}
                                        >
                                            <td className="text_center">{nvl(row.empId)}</td>
                                            <td>{nvl(row.empNm)}</td>
                                            <td>{nvl(row.deptNm)}</td>
                                            <td>{nvl(row.positionNm)}</td>
                                            <td className="text_center">{sNm}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
