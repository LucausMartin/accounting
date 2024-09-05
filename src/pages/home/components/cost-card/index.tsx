import { CostNumber } from '../cost-number';
import './index.less';

/**
 * @description 账单卡片
 */
const CostCard = () => {
  return (
    <div className="home-card">
      <div className="statistics-global">
        <div className="statistics-container">
          <span className="title">本月收入</span>
          <CostNumber cost={10000} className="amount" />
        </div>
        <div className="statistics-container">
          <span className="title">本月盈收</span>
          <CostNumber cost={2323.45} className="amount" />
        </div>
        <div className="statistics-container">
          <span className="title">本月目标</span>
          <CostNumber cost={2323.45} className="amount" />
        </div>
      </div>
      <div className="statistics-cost">
        <div className="statistics-container">
          <span className="title">本月支出</span>
          <CostNumber cost={-2323.45} className="amount" />
        </div>
      </div>
    </div>
  );
};

export { CostCard };
