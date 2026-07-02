import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE = '/insa/common/common_data.jsp';

export default function CodeSearchModal({ cdKind, cdKindNm, onClose, onSelect }) {
    const [keyword, setKeyword] = useState('');
    const [list, setList]       = useState([]);
    const [loading, setLoading] = useState(false);

    const doSearch = useCallback(async () => {
        if (!cdKind) return;
        setLoading(true);
        try {
            const { data } = await axios.get(BASE, { params: { action: 'codeSearch', cdKind, keyword } });
            setList(Array.isArray(data) ? data : []);
        } catch {
            alert('코드 조회 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [cdKind, keyword]);

    useEffect(() => { doSearch(); }, [cdKind]);

    return (
        <div
            className="modal_overlay open"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="modal_box" style={{ minWidth: 420 }}>
                <div className="modal_header">
                    {cdKindNm || cdKind} 검색
                    <button className="modal_close" onClick={onClose}>✕</button>
                </div>
                <div className="modal_body">
                    <div className="search_form" style={{ marginBottom: 8 }}>
                        <span className="s_label">코드명</span>
                        <input
                            type="text" value={keyword} style={{ width: 160 }}
                            placeholder="코드명 또는 코드값 검색"
                            onChange={e => setKeyword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && doSearch()}
                        />
                        <button className="btn btn_save" onClick={doSearch}>조회</button>
                    </div>
                    <div className="grid_wrap" style={{ maxHeight: 320, overflowY: 'auto' }}>
                        <table className="grid_table">
                            <thead>
                                <tr>
                                    <th style={{ width: 80 }}>코드</th>
                                    <th>코드명</th>
                                    <th style={{ width: 80 }}>약칭</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={3} className="text_center">조회 중...</td></tr>
                                ) : list.length === 0 ? (
                                    <tr><td colSpan={3} className="text_center">검색 결과가 없습니다.</td></tr>
                                ) : list.map(c => (
                                    <tr key={c.cd} style={{ cursor: 'pointer' }}
                                        onClick={() => { onSelect(c); onClose(); }}>
                                        <td className="text_center">{c.cd}</td>
                                        <td>{c.cdNm}</td>
                                        <td className="text_center">{c.shortNm}</td>
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
