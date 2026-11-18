
/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
			
    const handleSubmit= (event) => {        
        event.preventDefault();		


        const filterField = {
			"Марка": event.target["company"].value.toLowerCase(),
		    "Модель": event.target["model"].value.toLowerCase(),
            "Тип кузова": event.target["type"].value.toLowerCase(),
            "Мощность": [
                Number(event.target["forseMin"].value) || 0, 
                Number(event.target["forseMax"].value) || Infinity
            ]
	    };
			
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for(const key in  filterField) {
			if (Array.isArray(filterField[key])) {
                // Логика для ЧИСЛОВЫХ ИНТЕРВАЛОВ (Год, Высота)
                const [min, max] = filterField[key];
                arr = arr.filter(item => item[key] >= min && item[key] <= max);
            } else {
                // Логика для СТРОК (включая пустые значения)
                arr = arr.filter(item => 
                    item[key].toLowerCase().includes(filterField[key])
                );  
            }  
        }                       
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	}

    const handleReset = () => {
        props.filtering(props.fullData);

    }

    return (
        <form onSubmit={ handleSubmit } onReset={handleReset}>
            <p>
                <label>Марка:</label>
                <input name="company" type="text" />
            </p>  
            <p>
                <label>Модель:</label>		
                <input name="model" type="text" />
            </p>
            <p>
                <label>Тип кузова:</label> 
                <input name="type" type="text" />
            </p>
            <p>
                <label>Мощность от:</label>
                <input name="forseMin" type="number" /> 
            </p>
            <p>
                <label>Мощность до:</label> 
                <input name="forseMax" type="number" />
                
            </p>           

            <p>         
                <button type="submit">Фильтровать</button>   
                <button type="reset">Очистить фильтр</button>
            </p>
        </form> 
    )
}

export default Filter;
