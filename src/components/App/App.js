import "./App.css";
import templateModeration from "../../templateModeration.js";
import ModerationList from "../ModerationList/ModerationList";
import { useEffect, useState, useRef } from "react";
import InputPanel from "../InputPanel/InputPanel";

function App() {
    const [cards, setCards] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [addUserName, setAddUserName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, []);
    const getData = (arr=templateModeration) => {
        return setTimeout(() => {setCards(arr)}, 400)
    };

    const handleFilterInput = (e) => {
        let value = e.target.value;
        setSearchText(value);

        if (value === '' && addUserName.length !== 0) {
            const updateArray = getDataUpdate(addUserName)
            console.log('updateArray', updateArray)
            console.log('value.length', value.length)
            console.log('addUserName', addUserName)
            getData(updateArray);
            return;
        }

        if (value === '') {
            getData();
        }

        console.log(value)
        console.log(cards)
        const newLicenseBlock = filteredArray(value)
        updateData(newLicenseBlock);
        // updateData([
        //     {
        //         title: "Результати пошуку",
        //         template: [...newLicenseBlock],
        //     },
        // ]);
    };

    const filteredArray = (value, arr=templateModeration) => {
        const newLicenseBlock = arr
            .map((item) => item.template)
            .flat(Infinity)
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()));

        return [
            {
                title: "Результати пошуку",
                template: [...newLicenseBlock],
            },
        ]
    }

    const handleNameInput = (e) => {
        const value = e.target.value;
        setAddUserName(value);

        if (value === "") {
            getData();
            setAddUserName("");
            return;
        }

        // if (value !== '' && searchText !== '') {
        //     const updateArray = getDataUpdate(value)
        //     updateData(updateArray);
        // }

        const updateArray = searchText === '' ? getDataUpdate(value) : getDataUpdate(value, cards)
        updateData(updateArray);
    };

    const getDataUpdate = (addUserName, arr=templateModeration) => {

        return arr.map((item) => {
            const newArr = item.template.map(
                (i) => `${addUserName}, ${i[0].toLocaleLowerCase() + i.slice(1, -1)}`
            );

            return {
                title: item.title,
                template: newArr,
            };
        });

    }

    const updateData = (data) => {
        setCards(data);
    };

    const renderItems = (data) => {
        return data.map((item, index) => (
            <ModerationList
                title={item.title}
                data={item.template}
                key={index}
            />
        ));
    };

    if (isLoaded) {
        return <h1>Loading</h1>;
    }

    const items = renderItems(cards);

    return (
        <>
        <InputPanel
            text="пошук за ключовими словами"
            type="text"
            value={searchText}
            className="test_input"
            handleFunction={handleFilterInput}
        />
        <InputPanel
            text="додати ім'я користувача"
            type="text"
            value={addUserName}
            className="test_input"
            handleFunction={handleNameInput}
        />
            {/* <input
                placeholder="пошук за ключовими словами"
                type="text"
                value={searchText}
                className="test_input"
                onChange={handleFilterInput}
            /> */}

            {/* <input
                placeholder="додати ім'я користувача"
                type="text"
                value={addUserName}
                onChange={handleNameInput}
            /> */}

            <div className="App">{items}</div>
        </>
    );
}

export default App;

// const addNameToTemplates = (e) => {
//   const value = e.target.value;

//   if (value === "") {
//       resetCardsData();
//       setAddUserName("");
//       return;
//   }
//   setAddUserName(value)
//   resetCardsData();

//   const updateArray = templateModeration.map((item) => {
//       const newArr = item.template.map(
//           (i) => `${value}, ${i[0].toLocaleLowerCase() + i.slice(1, -1)}`
//       );

//       return {
//           title: item.title,
//           template: newArr,
//       };
//   });

//   // setAddUserName(value);
//   updateData(updateArray);
// };
