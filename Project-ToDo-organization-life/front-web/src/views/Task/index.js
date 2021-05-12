import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as S from './styles';
import api from '../../services/api';
import typeIcons from '../../utils/typeIcons';



function Task() {
    const [lateCount, setLateCount] = useState();
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');


  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
    })
  }

  async function save() {
      await api.post('/task', {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`
      }).then(() => {
          alert('TAREFA CADASTRADA COM SUCESSO!')
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
                <input type="text" placeholder="Título da tarefa ..." 
                onChange={e => setTitle(e.target.value)} value={title} />
            </S.Input>

            <S.TextArea>
                <span>Descrição</span>
                <textarea rows={5} placeholder="Detalhes da tarefa" 
                onChange={e => setDescription(e.target.value)} value={description}/>
            </S.TextArea>

            <S.Input>
                <span>Data</span>
                <input type="date" 
                onChange={e => setDate(e.target.value)} value={date}/>
            </S.Input>

            <S.Input>
                <span>Hora</span>
                <input type="time" 
                onChange={e => setHour(e.target.value)} value={hour}/>
            </S.Input>

            <S.Options>
                <div>
                    <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                    <span>CONCLUÍDO</span>
                </div>
                <button type="button">EXCLUIR</button>
            </S.Options>

            <S.Save>
                <button onClick={save} type="button">SALVAR</button>
            </S.Save>

        </S.Form>
        <Footer />
    </S.Container>
  );
}

export default Task;