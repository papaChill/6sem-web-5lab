import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";
import Sort from './Sort.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
   
    const updateDataTable = (value) => {
        props.onFilter(value);
        setActivePage(1);
    }

    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const [sortConfig, setSortConfig] = useState([]);
    const getSortedData = () => {
        if (sortConfig.length === 0) 
            return props.filter;

        return [...props.filter].sort((a, b) => {
            for (let config of sortConfig) {
                if (!config.field) 
                    continue;

                let valA = a[config.field];
                let valB = b[config.field];

                if (valA === valB) 
                    continue;

                let comparison = 0;
                if (typeof valA === 'number' && typeof valB === 'number') {
                    comparison = valA - valB;
                } else {
                    comparison = String(valA).localeCompare(String(valB));
                }
                return config.desc ? -comparison : comparison;
            }
        });
    };
    const finalSortedData = getSortedData();

    const isPag = props.isPag === "1";
    const amountRows = isPag ? props.amountRows : props.filter.length;

	//количество страниц разбиения таблицы
    const n = Math.ceil(props.filter.length / amountRows); 
      
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
        <span key={ index } 
        className={item == activePage ? "active": ""}
        onClick={ changeActive }> 
        { item } </span>
    );
    if (n==1){
        pages.length=0;
    }

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter 
        filtering={ updateDataTable } 
        data={ props.filter } 
        fullData={ props.data }/>
        <Sort 
            options={Object.keys(props.data[0])}  
            onSort={(config) => { setSortConfig(config); setActivePage(1); }} 
        />
        

        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody 
            body={ finalSortedData } 
            amountRows={ amountRows } 
            numPage={activePage}/>
        </table>

	    {isPag && ( <div className="pag">
                        {pages}
                    </div>
	    )}
      </>   
    )   
}

export default Table;