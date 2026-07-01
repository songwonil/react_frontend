import { useState } from 'react';

const MENU_GROUPS = [
    {
        title: '인력계획',
        items: [
            {
                label: '조직관리',
                items: [
                    { label: '조직정보관리', href: '#' },
                    { label: '조직일괄개편', href: '#' },
                    { label: '분할합병관리', href: '#' },
                    { label: '조직원 조회', href: '#' },
                    { label: '사업장관리', href: '#' },
                ]
            },
            {
                label: '조직관리_조회',
                items: [
                    { label: '조직정보관리_R', href: '#' }
                ]
            }
        ]
    },

    {
        title: '인력운영',
        items: [
            {
                label: '개인기록',
                items: [
                    { label: '개인기록(전산)', href: '/phm/PHM_001', key: 'PHM_001' },
                    { label: '인사기록카드(FULL)', href: '#' },
                    { label: '인사기록카드(요약)', href: '#' },
                    { label: '사원자료복사', href: '#' }
                ]
            },
            {
                label: '발령관리',
                items: [
                    { label: '발령품의등록', href: '#' },
                    { label: '발령품의결재', href: '#' },
                    { label: '발령내역관리', href: '#' }
                ]
            },
            {
                label: '증명서',
                items: [
                    { label: '증명서발급', href: '#' }
                ]
            },
            {
                label: '상벌관리',
                items: [
                    { label: '포상이력관리', href: '#' },
                    { label: '징계이력관리', href: '#' }
                ]
            },
            {
                label: '근태관리',
                items: [
                    { label: '근태기준관리', href: '#' },
                    { label: '연차관리', href: '#' },
                    { label: '하계휴가관리', href: '#' },
                    { label: '일근태내역관리', href: '#' },
                    { label: '근태현황', href: '#' },
                    { label: '연차관리(SO)', href: '#' },
                    { label: '연차사용계획현황(상반기)', href: '#' },
                    { label: '연차사용계획현황(하반기)', href: '#' },
                    { label: '연차계획현황조회(상반기)', href: '#' },
                    { label: '연차계획현황조회(하반기)', href: '#' },
                    { label: '연차사용지정일현황표', href: '#' },
                    { label: '지정일휴가자리스트', href: '#' },
                    { label: '연차관리(2018년개정 1년미만연차)', href: '#' },
                    { label: '연차계획현황조회(하반기)', href: '#' }
                ]
            },
            {
                label: '현황관리',
                items: [
                    { label: '장애인현황 조회', href: '#' },
                    { label: '보훈대상자 현황 조회', href: '#' }
                ]
            },
            {
                label: '인력통계',
                items: [
                    { label: '담당지점별 부서별 인원현황', href: '#' },
                    { label: '시점별 인사기본 리스트', href: '#' },
                    { label: '시점별 직책자 리스트', href: '#' },
                    { label: '소속법인별 부서별 인원현황', href: '#' },
                    { label: '퇴직금 중간정산자 리스트', href: '#' },
                    { label: '연차사용계획서 제출현황', href: '#' },
                    { label: '부서별 직위별 인원현황', href: '#' },
                    { label: 'SO별 직위별 인원현황', href: '#' },
                    { label: '담당지점별 직위별 인원현황', href: '#' },
                    { label: '지점별 인사기본 리스트', href: '#' }
                ]
            },
            {
                label: '연락망',
                items: [
                    { label: '임원 및 각 팀장 연락망', href: '#' },
                    { label: '관리담당자 연락망', href: '#' }
                ]
            }
        ]
    },
    {
        title: '교육관리',
        items: [
            { label: '교육과정관리', href: '#' },
            { label: '교육이수내역', href: '#' },
        ]
    },
    {
        title: '인건비계획',
        items: [
            { label: '휴직&휴가자리스트', href: '#' }
        ]
    },

    {
        title: '시스템관리',
        items: [
            {
                label: '권한관리',
                items: [
                    { label: '오브젝트등록', href: '#' },
                    { label: '오브젝트기능제한', href: '#' },
                    { label: '메뉴등록', href: '#' },
                    { label: '사용자그룹관리', href: '#' },
                    { label: '사용자관리', href: '#' },
                    { label: '로그인내역조회', href: '#' },
                    { label: '조직권한관리', href: '#' }
                ]
            },
            {
                label: '도움말관리',
                items: [
                    { label: '도움말관리', href: '#' },
                    { label: '도움말전체조회', href: '#' }
                ]
            },
            {
                label: '시스템관리',
                items: [
                    { label: '업무별기준관리', href: '#' },
                    { label: '화면정의', href: '#' },
                    { label: '팝업관리', href: '#' }
                ]
            },
            {
                label: 'HR게시판',
                items: [
                    { label: '계시판관리', href: '#' },
                    { label: '공지사항', href: '#' },
                    { label: 'Q/A', href: '#' },
                    { label: '자료실', href: '#' }
                ]
            },
            {
                label: '코드관리',
                items: [
                    { label: '코드관리', href: '#' },
                    { label: '학교관리', href: '#' },
                    { label: '전공코드', href: '#' },
                    { label: '자격면허코드', href: '#' },
                    { label: 'MAX값관리', href: '#' },
                    { label: '배치작업실행조회', href: '#' },
                    { label: '상수값(옵션)관리', href: '#' }
                ]
            },
            {
                label: '설문관리',
                items: [
                    { label: '설문대상자관리', href: '#' },
                    { label: '설문관리', href: '#' },
                    { label: '설문목록', href: '#' }
                ]
            },
            {
                label: 'HR캘린더',
                items: [
                    { label: '달력관리', href: '#' },
                    { label: 'HR캘린더등록', href: '#' },
                    { label: 'HR캘린더조회', href: '#' }
                ]
            },
            {
                label: 'HR전자결재',
                items: [
                    { label: '신청서기준정보등록', href: '#' },
                    { label: '강제반려', href: '#' },
                    { label: '결재내역조회', href: '#' },
                    { label: '참조함', href: '#' },
                    { label: '미결사항결재처리', href: '#' }
                ]
            },
            {
                label: '조건검색',
                items: [
                    { label: '조건값관리', href: '#' },
                    { label: '조건검색작성', href: '#' },
                    { label: '조건검색권한관리', href: '#' }
                ]
            },
            {
                label: '정형검색',
                items: [
                    { label: '테이블관리', href: '#' },
                    { label: '정형검색', href: '#' }
                ]
            },
            {
                label: '포탈관리',
                items: [
                    { label: '사용자그룹별컨텐츠', href: '#' },
                    { label: 'e-HR초기화면 설정', href: '#' }
                ]
            },
            {
                label: '자료전환',
                items: [
                    { label: '자료전환(발령정보)', href: '#' },
                    { label: '자료전환(계좌)', href: '#' },
                    { label: '연차계획현황(이메일대상업로드)', href: '#' },
                    { label: '중식대내역관리', href: '#' }
                ]
            }
        ]
    },
    {
        title: '직무및역량',
        items: [
            { label: '역량관리', href: '#' }
        ]
    },
    {
        title: '급여관리',
        items: [
            { label: '휴직&휴가자리스트', href: '#' },
            { label: '인원변동내역', href: '#' }
        ]
    },
    {
        title: '성과평가',
        items: [
            {
                label: '담당자용',
                items: [
                    {
                        label: '평가환경설정',
                        items: [
                            { label: '평가선택', href: '#' },
                            { label: '평가정의', href: '#' },
                            { label: '평가그룹관리', href: '#' },
                            { label: '평가레벨맵핑', href: '#' },
                            { label: '평가절차관리', href: '#' },
                            { label: '평가기준관리', href: '#' },
                            { label: 'PEER그룹관리', href: '#' },
                            { label: '대상자별PEER그룹관리', href: '#' },
                            { label: 'PEER그룹,등급별 배분인원관리', href: '#' },
                            { label: '평가협의체평가자관리', href: '#' },
                            { label: '지정KR Pool관리', href: '#' },
                            { label: '과정/리더십평가지생성기준', href: '#' },
                            { label: '과정/리더십평가지관리', href: '#' },
                            { label: '다면관련조직', href: '#' },
                            { label: '동료평가PEER그룹관리', href: '#' },
                            { label: '동료평가PEER그룹맵핑', href: '#' },
                            { label: '대상자관리', href: '#' },
                            { label: '평가자관리', href: '#' },
                            { label: '평가자현황(횡)', href: '#' },
                            { label: '평가자현황(열)', href: '#' },
                            { label: '조직KR', href: '#' },
                            { label: '조직점수관리', href: '#' }
                        ]
                    },
                    {
                        label: '평가진행모니터',
                        items: [
                            { label: '평가진행모니터링', href: '#' },
                            { label: 'APO조회', href: '#' },
                            { label: 'APO변경처리', href: '#' },
                            { label: 'P/L모니터링(관리자)', href: '#' },
                            { label: '자기신고서조회', href: '#' },
                            { label: '평가자조회', href: '#' },
                            { label: '평가자의견조회(담당자)', href: '#' },
                            { label: '평가자의견조회(개인)', href: '#' },
                            { label: 'Feedback(담당자)', href: '#' },
                            { label: 'Feedback', href: '#' },
                        ]
                    },
                    {
                        label: '평가결과',
                        items: [
                            { label: '평가결과업로드', href: '#' },
                            { label: '평가결좌관리', href: '#' },
                            { label: '평가구성별취합', href: '#' },
                            { label: '편차조정', href: '#' },
                            { label: '평가합산', href: '#' },
                            { label: '상대배분자동계산', href: '#' },
                            { label: '사원별평가합산', href: '#' },
                            { label: '개인별평가결좌', href: '#' },
                            { label: '종합평가결과', href: '#' },
                            { label: '분석및통계', href: '#' },
                            { label: '등급배분현황', href: '#' },
                            { label: '평가계산로그조회', href: '#' },
                            { label: '평가결과관리', href: '#' }
                        ]
                    }
                ]
            },
            {
                label: '직원용',
                items: [
                    {
                        label: '평가대상자',
                        items: [
                            { label: 'APO변경신청', href: '#' }
                        ]
                    },
                    {
                        label: '평가자',
                        items: [
                            { label: 'APO변경신청승인', href: '#' },
                            { label: 'APO조회(관리자)', href: '#' }
                        ]
                    },
                    { label: '인사평가', href: '#' },
                    { label: '역량및행동지표', href: '#' }

                ]
            },
            {
                label: '현황_개발중',
                items: [
                    { label: 'P/L모니터링(관리자)', href: '#' },
                    { label: 'P/L모니터링', href: '#' },
                    { label: '인원배분 기준관리', href: '#' },
                    { label: 'RM실적관리_지사별', href: '#' },
                    { label: 'RM실적관리_기사별', href: '#' },
                    { label: '실적현황_지사', href: '#' },
                    { label: '유형별현황_지사', href: '#' },
                    { label: '지사별일일실적추이', href: '#' },
                    { label: '동료상향평가결과', href: '#' },
                    { label: '상향평가의견조회(관리자)', href: '#' },
                    { label: '이의제기이력조회(관리자)', href: '#' },
                    { label: '평가협의체(관리자)', href: '#' },
                    { label: '종합평가결과(1차)', href: '#' },
                    { label: '종합평가결과(2차)', href: '#' },
                    { label: '종합평가결과(관리자)', href: '#' },
                    { label: '종합평가집계표', href: '#' },
                    { label: '관리자평가점수관리', href: '#' },
                    { label: '교육점수업로드', href: '#' },
                    { label: '평가일지/중간면담서 현황', href: '#' },
                    { label: '평가일지/중간면담서', href: '#' }
                ]
            }
        ]
    },
    {
        title: '조직관리',
        items: [
            { label: '조직정보관리', href: '#' },
            { label: '조직일괄개편', href: '#' },
            { label: '분할합병관리', href: '#' },
            { label: '조직원 조회', href: '#' },
            { label: '사업장관리', href: '#' }
        ]
    },

];

// ✅ 재귀 컴포넌트 — items가 있으면 토글 폴더, 없으면 링크로 렌더링
function MenuItem({ item, depth = 0, activeMenu }) {
    const [open, setOpen] = useState(false);
    const hasChildren = item.items && item.items.length > 0;
    const indent = depth * 14;

    if (hasChildren) {
        return (
            <div>
                <div
                    className={`left_menu_item depth_${depth}${open ? ' open' : ''}`}
                    style={{ paddingLeft: `${12 + indent}px` }}
                    onClick={() => setOpen(o => !o)}
                >
                    <span className="arrow">{open ? '▼' : '▶'}</span>
                    {item.label}
                </div>
                {open && (
                    <div className="left_menu_children">
                        {item.items.map(child => (
                            <MenuItem
                                key={child.label}
                                item={child}
                                depth={depth + 1}
                                activeMenu={activeMenu}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <a
            href={item.href || '#'}
            className={`left_menu_leaf${item.key && activeMenu === item.key ? ' active' : ''}`
            }
            style={{ paddingLeft: `${12 + indent}px` }}
        >
            {item.label}
        </a >
    );
}
// 최상위 그룹 (인력계획 / 인력운영 등)
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
                    <MenuItem
                        key={item.label}
                        item={item}
                        depth={0}
                        activeMenu={activeMenu}
                    />
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

            <div id="sub_menu_bar">
                <button className="btn_menu" onClick={() => setNavVisible(v => !v)}>MENU</button>
                <button className="btn_menu">BOOKMARK</button>
            </div>

            <div id="content_wrap">
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
                <div id="main_content">{children}</div>
            </div>

            <div className="loading_overlay" id="loadingOverlay">데이터를 불러오는 중...</div>
        </div>
    );
}