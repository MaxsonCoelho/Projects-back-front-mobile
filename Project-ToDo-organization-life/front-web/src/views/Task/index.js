import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as S from './styles';
import api from '../../services/api';
import typeIcons from '../../utils/typeIcons';
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';



function Task() {
    const [lateCount, setLateCount] = useState();
    const [type, setType] = useState();

  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
    })
  }

  useEffect(() => {
    lateVerify();
  },[])

  return (
    <S.Container>
        <Header lateCount={lateCount} />
        <S.Form>
            <S.TypeIcons>
                {
                    typeIcons.map((icon, index ) => 
                        (index > 0 &&
                            <button onClick={() => setType(index)}>
                                <img src={icon} alt="Tipo da Tarefa"
                                className={type && type != index && 'inative'} />
                            </button>
                        )
                    )
                }
            </S.TypeIcons>
            
            <S.Input>
                <span>Título</span>
                <input type="text" placeholder="Título da tarefa ..."></input>
            </S.Input>

            <S.TextArea>
                <span>Título</span>
                <textarea rows={5} placeholder="Detalhes da tarefa" />
            </S.TextArea>

            <S.Input>
                <span>Data</span>
                <input type="date"></input>
            </S.Input>

            <S.Input>
                <span>Hora</span>
                <input type="time"></input>
            </S.Input>

            <S.Options>
                <div>
                    <input type="checkbox" />
                    <span>CONCLUÍDO</span>
                </div>
                <button type="button">EXCLUIR</button>
            </S.Options>

            <S.Save>
                <button type="button">SALVAR</button>
            </S.Save>

        </S.Form>
        <Footer />
    </S.Container>
  );
}

export default Task;