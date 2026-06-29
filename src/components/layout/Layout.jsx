import { useState } from 'react';

const MENU_GROUPS = [
    { title: '인력계획',   items: [{ label: '인력계획현황', href: '#' }] },
    { title: '인력운영',   items: [{ label: '인력현황', href: '#' }, { label: '발령관리', href: '#' }] },
    {
        title: '개인기록', defaultOpen: true,
        items: [
            { label: '개인기록(전산)',     href: '/phm/PHM_001', key: 'PHM_001' },
            { label: '인사기록카드(FULL)', href: '#' },
            { label: '인사기록카드(요약)', href: '#' },
            { label: '사원자료복사',       href: '#' },
        ],
    },
    { title: '증문서',     items: [{ label: '증명서 발급', href: '#' }] },
    { title: '상벌관리',   items: [{ label: '상벌내역',   href: '#' }] },
    { title: '근태관리',   items: [{ label: '근태현황',   href: '#' }] },
    { title: '현황관리',   items: [{ label: '인사현황',   href: '#' }] },
    { title: '인사통계',   items: [{ label: '통계조회',   href: '#' }] },
    { title: '연명',       items: [{ label: '연명부',     href: '#' }] },
    { title: '교육관리',   items: [{ label: '교육이력',   href: '#' }] },
    { title: '인건비계획', items: [{ label: '인건비현황', href: '#' }] },
    { title: '시스템관리', items: [{ label: '코드관리',   href: '#' }, { label: '권한관리', href: '#' }] },
    { title: '급여관리',   items: [{ label: '급여현황',   href: '#' }] },
    { title: '평가관리',   items: [{ label: '평가이력',   href: '#' }] },
    { title: '성과평가',   items: [{ label: '성과평가',   href: '#' }] },
    { title: '조직관리',   items: [{ label: '조직도',     href: '#' }] },
];

function MenuGroup({ title, items, defaultOpen = false, activeMenu }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="left_menu_group">
            <div
                className={`left_menu_title${open ? ' open' : ''}`}
                onClick={() => setOpen(o => !o)}
            >
                {title} <span className="arrow">▶</span>
            </div>
            <div className={`left_menu_items${open ? ' open' : ''}`}>
                {items.map(item => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={item.key && activeMenu === item.key ? 'active' : ''}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function Layout({ children, activeMenu = 'PHM_001', loginUser = '관리자' }) {
    const [navVisible, setNavVisible] = useState(true);

    const handleLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) location.href = '/';
    };

    return (
        <div id="wrap">
            {/* ===== 헤더 ===== */}
            <div id="header">
                <div className="logo_wrap">
                    <div className="logo_main">D&apos;<span>LIVE</span></div>
                    <div className="logo_sub">(주)딜라이브</div>
                </div>
                <div className="header_right">
                    <div className="top_links">
                        <a href="#">포털배치</a>
                        <a href="#">비밀번호변경</a>
                        <a href="#">직원검색</a>
                        <a href="#">담당자연락처</a>
                    </div>
                    <div className="user_bar">
                        <div className="user_greeting">
                            <strong>{loginUser}님</strong> 반갑습니다
                            <button className="btn_logout" onClick={handleLogout}>LOG-OUT</button>
                        </div>
                        <div className="main_nav">
                            <a href="#">My인사</a>
                            <a href="#">HR전자결재</a>
                            <a href="#">HR에 시민</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== 서브 메뉴바 ===== */}
            <div id="sub_menu_bar">
                <button className="btn_menu" onClick={() => setNavVisible(v => !v)}>MENU</button>
                <button className="btn_menu">BOOKMARK</button>
            </div>

            {/* ===== 콘텐츠 래퍼 ===== */}
            <div id="content_wrap">

                {/* ===== 좌측 메뉴 ===== */}
                {navVisible && (
                    <div id="left_nav">
                        <div className="left_agent_wrap">
                            <div className="left_agent_label">◎ 총괄담당</div>
                            <select><option>전체</option></select>
                            <button className="btn_hide">HIDE</button>
                        </div>
                        {MENU_GROUPS.map(group => (
                            <MenuGroup
                                key={group.title}
                                title={group.title}
                                items={group.items}
                                defaultOpen={group.defaultOpen}
                                activeMenu={activeMenu}
                            />
                        ))}
                    </div>
                )}

                {/* ===== 메인 콘텐츠 ===== */}
                <div id="main_content">
                    {children}
                </div>

            </div>

            <div className="loading_overlay" id="loadingOverlay">데이터를 불러오는 중...</div>
        </div>
    );
}
