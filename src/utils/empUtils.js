import axios from 'axios';

const BASE_URL = '/insa/phm/PHM_001_data.jsp';

export function nvl(v, d = '') {
    return (v === null || v === undefined || v === '') ? d : String(v);
}

export function calcYears(joinDt) {
    if (!joinDt) return '';
    const join = new Date(joinDt);
    if (isNaN(join)) return '';
    const now = new Date();
    let y = now.getFullYear() - join.getFullYear();
    const m = now.getMonth() - join.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < join.getDate())) y--;
    return y + '년';
}

export async function apiFetch(params) {
    const { data } = await axios.get(BASE_URL, { params });
    return data;
}

export async function apiPost(params) {
    const body = new URLSearchParams(params).toString();
    const { data } = await axios.post(BASE_URL, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return data;
}

export const TABS = [
    { key: 'basic',      label: '기본' },
    { key: 'appoint',    label: '발령' },
    { key: 'name',       label: '이름' },
    { key: 'personal',   label: '인적사항' },
    { key: 'tel',        label: '전화번호' },
    { key: 'addr',       label: '주소' },
    { key: 'memorial',   label: '기념일' },
    { key: 'family',     label: '가족' },
    { key: 'edu',        label: '학력' },
    { key: 'career',     label: '경력' },
    { key: 'cert',       label: '자격' },
    { key: 'lang',       label: '어학' },
    { key: 'military',   label: '병역' },
    { key: 'account',    label: '계좌' },
    { key: 'disability', label: '장애' },
    { key: 'veteran',    label: '보훈' },
    { key: 'duty',       label: '담당업무' },
    { key: 'biz',        label: '출장' },
    { key: 'training',   label: '교육' },
    { key: 'eval',       label: '평가' },
    { key: 'reward',     label: '상벌' },
    { key: 'club',       label: '동호회' },
    { key: 'condol',     label: '경조사' },
    { key: 'longterm',   label: '장기근속기준일 관리' },
    { key: 'retire',     label: '퇴직금기산일' },
    { key: 'guarantee',  label: '신원보증' },
    { key: 'health',     label: '건강' },
    { key: 'workplace',  label: '근무지' },
    { key: 'etc',        label: '기타' },
    { key: 'therapy',    label: '감정치유휴가 관리' },
    { key: 'tenure',     label: '근속수' },
];

export const EMPTY_FORM = {
    empId: '', empNmLast: '', empNmFirst: '', empNmHanja: '', empSsn: '',
    workStatus: '1', grpJoinDt: '', corpJoinDt: '', corpNm: '', workSo: '',
    deptNm: '', positionNm: '', titleNm: '', mobileNo: '', officeTel: '', homeTel: '',
    photoPath: '', empNmEng: '', empGender: '', empBirthDt: '', empNationality: '내국인',
    eduLevel: '', jobType: '', dutyNm: '', corpEmail: '', personalEmail: '',
    veteranYn: 'N', disabilityYn: 'N', clubNm: '', maritalStatus: '', hometown: '', homeAddr: '',
};
