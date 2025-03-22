import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  
  const handleChange = event => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      Filter 
        <input
        name="filter"
        onChange={handleChange}
        /> 

    </div>
  )
}

export default VisibilityFilter