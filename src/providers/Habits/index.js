import { createContext, useContext, useState, useEffect } from "react"
import api from "../../services/api"
import { useLogin } from "../User"

const HabitsContext = createContext()

export const HabitsProvider = ({ children }) => {
	// Escreva suas funções aqui!

	//User Habits
	const [habits, setHabits] = useState([])
	//User Habits achieved
	const [achievedHabits, setAchievedHabits] = useState([])
	//User Habits total count
	const [habitsCount, setHabitsCount] = useState(0)
	//User Habits achieved total count
	const [achievedHabitsCount, setAchievedHabitsCount] = useState(0)


	const { accToken, userId } = useLogin();

	useEffect(() => {
		
		const getMyHabits = () => {

			api
				.get("/habits/personal/", {
					headers: {
						Authorization: `Bearer ${accToken}`,
					},
				})
				.then(({data}) => {

					setHabits(data)
				})
				.catch((err) => console.log(err))
		}
		
		if (userId !== -1) {
			getMyHabits()
		}
	}, [accToken, userId])

	useEffect (() => {

		let filterHabits = habits.filter(habit => habit.achieved === true)

		setHabitsCount(habits.length)
		setAchievedHabits(filterHabits)
		setAchievedHabitsCount(filterHabits.length)
	}, [habits])

	const addHabit = (formData) => {

		const {title, category, difficulty, frequency} = formData

		let newHabit = {
			title,
			category,
			difficulty,
			frequency,
			achieved: false,
			how_much_achieved: 0,
			user: userId,
		}
		console.log(newHabit)

		api
			.post('/habits/', newHabit,
			{
				headers: {
					Authorization: `Bearer ${accToken}`,
				},
			})
			.then((res) => {
				setHabits([...habits, newHabit])
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<HabitsContext.Provider 
			value={{
				habits,
				achievedHabits,
				habitsCount,
				achievedHabitsCount,
				addHabit,
			}}
		>
			{children}</HabitsContext.Provider>
	)
}

export const useHabits = () => useContext(HabitsContext)
