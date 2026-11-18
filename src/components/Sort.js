import { useState } from "react";

const Sort = ({ options, onSort, onReset }) => {
    const [selections, setSelections] = useState({ 1: '', 2: '', 3: '' });
    const [descs, setDescs] = useState({ 1: false, 2: false, 3: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = [1, 2, 3].map(lvl => ({ 
            field: selections[lvl], 
            desc: descs[lvl] 
        }));
        onSort(config);
    };

    const handleReset = () => {
        setSelections({ 1: '', 2: '', 3: '' });
        setDescs({ 1: false, 2: false, 3: false });
        onSort([]);
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <h4>Сортировка</h4>
            {[1, 2, 3].map(level => {
                const usedFields = Object.entries(selections)
                    .filter(([lvl, val]) => Number(lvl) < level && val !== '')
                    .map(([lvl, val]) => val);

                const availableOptions = options.filter(opt => !usedFields.includes(opt));

                return (
                    <div key={level} style={{ marginBottom: '10px' }}>
                        <label>
                            {level}-й уровень: 
                        </label>
                        <select 
                            value={selections[level]}
                            onChange={(e) => setSelections({...selections, [level]: e.target.value})}
                            disabled={level > 1 && !selections[level - 1]}
                        >
                            <option value="">
                                Нет
                            </option>
                            {availableOptions.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>

                        <label> 
                            По убыванию: 
                        </label>
                        <input type="checkbox" checked={descs[level]} 
                            onChange={(e) => setDescs({...descs, [level]: e.target.checked})}
                            disabled={!selections[level]} 
                        />
                    </div>
                );
            })}
            <button type="submit">Сортировать</button>
            <button type="reset">Сбросить</button>
        </form>
    );
};

export default Sort;

