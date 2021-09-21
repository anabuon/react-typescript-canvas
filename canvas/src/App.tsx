import React, {useState, useEffect} from 'react';
import Square from './components/Square'
import styled from 'styled-components'

interface Props {
  width: number;
}

interface ISubmitDrawResult {
  text: string;
  color: string;
}

const AppWrapper = styled.div<Props>`
width: ${props => 42*props.width}px;
display: flex;
flex-wrap: wrap;
`


const App = () => {

  const [dataDraw, setDataDraw] = useState<ISubmitDrawResult[]>([])
  const [dataInput, setDataInput] = useState([])
  const [canvasSize, setCanvasSize] = useState([])




  const getIndex = (x: number, y: number): number => {
    const width: number | string = canvasSize[0]
    return width*(y-1)+x-1
  }

  const drawLine = (arr: {text: string; color: string}[], x1: number, y1: number, x2: number, y2: number) => {
    const isVertical = x1 === x2
    const isHorizontal = y1 === y2
    const createVector = (a: number, b: number): Array<number> => [Math.min(a, b), Math.max(a, b)]

    if (isVertical) {
      let [start, end] = createVector(y1, y2)
        for (let i = start; i <= end; ++i) {
          arr[getIndex(x1, i)].text = 'x'
          arr[getIndex(x1, i)].color = 'white'
        }
    }

    if (isHorizontal) {
      let [start, end] = createVector(x1, x2)
        for (let i = start; i <= end; ++i) {
          arr[getIndex(i, y1)].text = 'x'
          arr[getIndex(i, y1)].color = 'white'
        }
    }
  }
    

  const drawRectangle = (arr: {text: string; color: string}[], x1: number, y1: number, x2: number, y2: number) => {
    drawLine(arr,x1, y1, x2, y1)
    drawLine(arr,x2, y1, x2, y2)
    drawLine(arr,x2, y2, x1, y2)
    drawLine(arr,x1, y2, x1, y1)
  }

  const checkPoints = (...point: number[]) => {
    const [width, height] = canvasSize
    const abs = point.filter((e: number, i: number) => !(i % 2))
    const ord = point.filter((e: number, i: number) => i % 2)

    return (
        abs.every((e: number) => e >= 1 && e <= width) &&
        ord.every((e: number) => e >= 1 && e <= height)
    )
  }

  const fill = (
    arr: {text: string; color: string}[], 
    x: number | string, 
    y: number | string, 
    color: string) => {
          const point: {x: number; y: number} = { x: +x, y: +y }
          const queue: any = []
          const checkPixels: any = {}
          queue.push(point)

          if (color === 'o')  color = '#808000'
          if (color === 'f') color = '#FA8072'

          while (queue.length) {
              let { x, y } = queue.pop();
              const pixelKey = `${x}-${y}`

              if (checkPoints(x, y) && !checkPixels[pixelKey]) {
                  const pixel: {} = arr[getIndex(x, y)].text
                  checkPixels[pixelKey] = true

                  if (pixel !== 'x') {
                      arr[getIndex(x, y)].color = color
                      queue.push({ x: x + 1, y })
                      queue.push({ x: x - 1, y })
                      queue.push({ x, y: y + 1 })
                      queue.push({ x, y: y - 1 })
                  }
              }
          }
    }


  useEffect(()=> {
    const fetchData = async () => {
      const data = await fetch('http://localhost:5000')
      const result = await data.json()
      const canvasSize = result.readFile[0]?.match(/\d+/g)
      setCanvasSize(canvasSize)
      setDataInput(result.readFile)
    }
    fetchData()
  }, [])


  useEffect(()=> {
    const dataNum: (RegExpMatchArray | null)[] = dataInput.map((e: string, index) => {
      return e.match(/[\dof]+/g)
    })
    
    if(canvasSize.length > 0 && dataInput.length > 0) {
      const [width, height]: (number | string)[] = canvasSize
      const arr : {text: string; color: string}[] = new Array(width*height).fill('').map((e: {text: string; color: string}) => ({text: '', color: ''}))
 

      for (let i = 1; i <= dataInput.length - 1; i++) {
        const [x1, y1, x2, y2]: any = dataNum[i]
        const [x, y, color]: any = dataNum[i]

          if (dataInput[i][0] === 'L' ) {
              drawLine(arr, +x1, +y1, +x2, +y2)
          }
          if (dataInput[i][0] === 'R'){
              drawRectangle(arr, +x1, +y1, +x2, +y2)
          }
          if (dataInput[i][0] === 'B') {
              fill(arr, x, y, color)
          }
      }    

      setDataDraw(arr)
    }
  }, [canvasSize, dataInput])


  return (
    <AppWrapper width={canvasSize[0]}>
          {dataDraw.length > 0 ? dataDraw.map((el: {text: string; color: string}, index) => {
            return (<Square color={el.color} key={index} text={el.text}/>)}) 
          : null}
    </AppWrapper>
  )
}

export default App
