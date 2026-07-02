import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE = '/insa/common/common_data.jsp';

export default function DeptSearchModal({ onClose, onSelect }) {
    const [keyword, setKeyword] = useState('');
    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(false);

    const doSearch = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(BASE, { params: { action: 'deptSearch', keyword } });
            setList(Array.isArray(data) ? data : []);
        } catch {
            alert('부서 조회 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [keyword]);

    useEffect(() => { doSearch(); }, []);

    return (
        <div
            className="modal_overlay open"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="modal_box" style={{ minWidth: 500 }}>
                <div className="modal_header">
                    부서 검색
                    <button className="modal_close" onClick={onClose}>✕</button>
                </div>
                <div className="modal_body">
                    <div className="search_form" style={{ marginBottom: 8 }}>
                        <span className="s_label">부서명</span>
                        <input
                            type="text" value={keyword} style={{ width: 160 }}
                            placeholder="부서명 검색"
                            onChange={e => setKeyword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && doSearch()}
                        />
                        <button className="btn btn_save" onClick={doSearch}>조회</button>
                    </div>
                    <div className="grid_wrap" style={{ maxHeight: 350, overflowY: 'auto' }}>
                        <table className="grid_table">
                            <thead>
                                <tr>
                                    <th style={{ width: 90 }}>부서코드</th>
                                    <th>부서명</th>
                                    <th style={{ width: 80 }}>약칭</th>
                                    <th>상위부서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} className="text_center">조회 중...</td></tr>
                                ) : list.length === 0 ? (
                                    <tr><td colSpan={4} className="text_center">검색 결과가 없습니다.</td></tr>
                                ) : list.map(d => (
                                    <tr key={d.orgCd} style={{ cursor: 'pointer' }}
                                        onClick={() => { onSelect(d); onClose(); }}>
                                        <td className="text_center">{d.orgCd}</td>
                                        <td>{d.orgNm}</td>
                                        <td className="text_center">{d.shortNm}</td>
                                        <td>{d.parentNm}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 11, color: '#888', marginTop: 4 }}>
                        [{list.length}건]
                    </div>
                </div>
            </div>
        </div>
    );
}
