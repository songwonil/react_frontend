import { useState, useEffect, useCallback } from 'react';
import { nvl, apiFetch, apiPost, EMPTY_FORM } from '../../utils/empUtils';
import EmpHeader    from '../../components/phm/EmpHeader';
import TabBar       from '../../components/phm/TabBar';
import SearchModal  from '../../components/phm/SearchModal';
import BasicTab     from '../../components/phm/tabs/BasicTab';
import AppointTab   from '../../components/phm/tabs/AppointTab';
import FamilyTab    from '../../components/phm/tabs/FamilyTab';
import EduTab       from '../../components/phm/tabs/EduTab';
import CareerTab    from '../../components/phm/tabs/CareerTab';

const TAB_ACTIONS = {
    appoint: 'getAppoint',
    family:  'getFamily',
    edu:     'getEdu',
    career:  'getCareer',
};

export default function PHM001() {
    const [form, setForm]             = useState(EMPTY_FORM);
    const [activeTab, setActiveTab]   = useState('basic');
    const [tabData, setTabData]       = useState({ appoint: null, family: null, edu: null, career: null });
    const [tabLoading, setTabLoading] = useState({});
    const [searchOpen, setSearchOpen] = useState(false);

    const updateForm = useCallback((field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const loadEmpInfo = useCallback(async (empId) => {
        if (!empId) return;
        try {
            const d = await apiFetch({ action: 'getEmp', empId });
            if (d.error) { alert(d.error); return; }
            const nm = nvl(d.empNm);
            setForm({
                empId:         nvl(d.empId),
                empNmLast:     nm.length > 1 ? nm[0] : nm,
                empNmFirst:    nm.length > 1 ? nm.slice(1) : '',
                empNmHanja:    nvl(d.empNmHanja),
                empSsn:        nvl(d.empSsn),
                workStatus:    nvl(d.workStatus, '1'),
                grpJoinDt:     nvl(d.grpJoinDt),
                corpJoinDt:    nvl(d.corpJoinDt),
                corpNm:        nvl(d.corpNm),
                workSo:        nvl(d.workSo),
                deptNm:        nvl(d.deptNm),
                positionNm:    nvl(d.positionNm),
                titleNm:       nvl(d.titleNm),
                mobileNo:      nvl(d.mobileNo),
                officeTel:     nvl(d.officeTel),
                homeTel:       nvl(d.homeTel),
                photoPath:     nvl(d.photoPath),
                empNmEng:      nvl(d.empNmEng),
                empGender:     nvl(d.empGender),
                empBirthDt:    nvl(d.empBirthDt),
                empNationality: nvl(d.empNationality, '내국인'),
                eduLevel:      nvl(d.eduLevel),
                jobType:       nvl(d.jobType),
                dutyNm:        nvl(d.dutyNm),
                corpEmail:     nvl(d.corpEmail),
                personalEmail: nvl(d.personalEmail),
                veteranYn:     nvl(d.veteranYn, 'N'),
                disabilityYn:  nvl(d.disabilityYn, 'N'),
                clubNm:        nvl(d.clubNm),
                maritalStatus: nvl(d.maritalStatus),
                hometown:      nvl(d.hometown),
                homeAddr:      nvl(d.homeAddr),
            });
            setTabData({ appoint: null, family: null, edu: null, career: null });
        } catch {
            alert('사원 정보를 불러올 수 없습니다.');
        }
    }, []);

    const loadTabData = useCallback(async (tabKey, empId) => {
        const action = TAB_ACTIONS[tabKey];
        if (!action || !empId) return;
        setTabLoading(prev => ({ ...prev, [tabKey]: true }));
        try {
            const data = await apiFetch({ action, empId });
            setTabData(prev => ({ ...prev, [tabKey]: Array.isArray(data) ? data : [] }));
        } catch {
            alert('데이터를 불러올 수 없습니다.');
        } finally {
            setTabLoading(prev => ({ ...prev, [tabKey]: false }));
        }
    }, []);

    // 탭 전환 시 미로드 데이터 조회
    useEffect(() => {
        if (form.empId && TAB_ACTIONS[activeTab] && tabData[activeTab] === null) {
            loadTabData(activeTab, form.empId);
        }
    }, [activeTab, form.empId]);

    // URL ?empId= 파라미터 처리
    useEffect(() => {
        const empId = new URLSearchParams(window.location.search).get('empId');
        if (empId) loadEmpInfo(empId);
    }, []);

    const handleSave = async () => {
        if (!form.empId) { alert('사번이 없습니다. 직원을 먼저 검색해 주세요.'); return; }
        if (!confirm('인사 기록을 저장하시겠습니까?')) return;
        try {
            const data = await apiPost({
                action:        'saveEmp',
                empId:         form.empId,
                empNm:         form.empNmLast + form.empNmFirst,
                empNmHanja:    form.empNmHanja,
                empSsn:        form.empSsn,
                workStatus:    form.workStatus,
                grpJoinDt:     form.grpJoinDt,
                corpJoinDt:    form.corpJoinDt,
                workSo:        form.workSo,
                positionNm:    form.positionNm,
                titleNm:       form.titleNm,
                mobileNo:      form.mobileNo,
                officeTel:     form.officeTel,
                homeTel:       form.homeTel,
                empNmEng:      form.empNmEng,
                empGender:     form.empGender,
                empBirthDt:    form.empBirthDt,
                empNationality: form.empNationality,
                eduLevel:      form.eduLevel,
                jobType:       form.jobType,
                dutyNm:        form.dutyNm,
                corpEmail:     form.corpEmail,
                personalEmail: form.personalEmail,
                veteranYn:     form.veteranYn,
                disabilityYn:  form.disabilityYn,
                clubNm:        form.clubNm,
                maritalStatus: form.maritalStatus,
                hometown:      form.hometown,
                homeAddr:      form.homeAddr,
            });
            if (data.result === 'error') {
                alert('저장에 실패했습니다: ' + data.message);
            } else {
                alert('저장되었습니다.');
                loadEmpInfo(form.empId);
            }
        } catch {
            alert('저장에 실패했습니다.');
        }
    };

    const handlePhotoUpload = () => {
        if (!form.empId) { alert('사번이 없습니다. 직원을 먼저 검색해 주세요.'); return; }
        alert('사진 등록 기능은 추후 구현됩니다.');
    };

    const handlePrint = () => {
        if (!form.empId) { alert('사번이 없습니다.'); return; }
        window.open(`/insa/phm/PHM_001_print.jsp?empId=${form.empId}`, '_blank', 'width=800,height=600');
    };

    const notImpl  = () => alert('추가 기능은 추후 구현됩니다.');
    const confirmDel = () => { if (confirm('삭제하시겠습니까?')) alert('삭제 기능은 추후 구현됩니다.'); };

    const renderTab = () => {
        switch (activeTab) {
            case 'basic':   return <BasicTab form={form} onChange={updateForm} />;
            case 'appoint': return <AppointTab data={tabData.appoint} loading={!!tabLoading.appoint} />;
            case 'family':  return <FamilyTab  data={tabData.family}  loading={!!tabLoading.family}  onAdd={notImpl} onDelete={confirmDel} />;
            case 'edu':     return <EduTab     data={tabData.edu}     loading={!!tabLoading.edu}     onAdd={notImpl} onDelete={confirmDel} />;
            case 'career':  return <CareerTab  data={tabData.career}  loading={!!tabLoading.career}  onAdd={notImpl} onDelete={confirmDel} />;
            default:        return <p style={{ padding: 20, color: '#888' }}>준비 중입니다.</p>;
        }
    };

    return (
        <>
            {/* 브레드크럼 */}
            <div className="breadcrumb">
                <a href="#">인력운영</a>
                <span className="sep">›</span>
                <a href="#">개인기록</a>
                <span className="sep">›</span>
                <span className="current">개인기록(전산)</span>
                <span className="page_code">PHM_001</span>
                <button className="btn_del"
                    onClick={() => { if (confirm('탭을 닫겠습니까?')) history.back(); }}>
                    del ×
                </button>
            </div>

            {/* 인사기본사항 */}
            <EmpHeader
                form={form}
                onChange={updateForm}
                onSearch={() => setSearchOpen(true)}
                onSave={handleSave}
                onPhotoUpload={handlePhotoUpload}
                onPrint={handlePrint}
            />

            {/* 탭 영역 */}
            <div className="tab_wrap" id="mainTabWrap">
                <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="tab_content">
                    {renderTab()}
                </div>
            </div>

            {/* 직원 검색 모달 */}
            {searchOpen && (
                <SearchModal
                    initNm={form.empNmLast + form.empNmFirst}
                    onClose={() => setSearchOpen(false)}
                    onSelect={empId => { setSearchOpen(false); loadEmpInfo(empId); }}
                />
            )}
        </>
    );
}
