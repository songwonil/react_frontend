import { useRef } from 'react';
import { TABS } from '../../utils/empUtils';

export default function TabBar({ activeTab, onTabChange }) {
    const barRef = useRef(null);
    const scrollBy = delta => { if (barRef.current) barRef.current.scrollLeft += delta; };

    return (
        <div className="tab_bar" id="mainTabBar" ref={barRef}>
            {TABS.map(tab => (
                <div
                    key={tab.key}
                    className={`tab_item${activeTab === tab.key ? ' active' : ''}`}
                    data-tab={tab.key}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </div>
            ))}
            <div className="tab_nav_btns">
                <button onClick={() => scrollBy(-300)}>&#171;&#171;</button>
                <button onClick={() => scrollBy(-150)}>&#60;</button>
                <button onClick={() => scrollBy(150)}>&#62;</button>
                <button onClick={() => scrollBy(300)}>&#187;&#187;</button>
            </div>
        </div>
    );
}
