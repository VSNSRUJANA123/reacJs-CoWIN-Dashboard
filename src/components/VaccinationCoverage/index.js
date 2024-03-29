// Write your code here  VaccinationCoverage
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7dys} = props

  const DataFormatter = number => {
    if (number > 6000) {
      return `${(number / 3000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="last7days">
      <h1>Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={last7dys}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            className="bar"
            dataKey="dose1"
            name="Dose1"
            fill="#5a8dee"
            barSize="25%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            className="bar"
            dataKey="dose2"
            name="Dose2"
            fill="#f54394"
            barSize="25%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
