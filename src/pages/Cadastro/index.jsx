import React, {useState} from "react";
import InputMask from 'react-input-mask'


import './style.css'
import api from "../../services/api";
import userlogin from '../../assets/user-login.png'

export default function Cadastro(){

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [sexo, setSexo] = useState('');
    const [filiacao, setFiliacao] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [data_batismo, setData_batismo] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf] = useState('CE');
    const [congregacao, setCongregacao] = useState('');
    const [funcao, setFuncao] = useState('');
    const [estado_civil, setEstado_civil] = useState('')
    const [imagem, setImagem] = useState('')
    const [isSet, setIsSet] = useState(false)


    async function handleSubmit(e){
        e.preventDefault();
        
        const dataImage = new FormData();

        dataImage.append('file', imagem)

        const data = {
            nome,
            cpf, 
            rg,
            sexo,
            filiacao,
            data_nascimento,
            data_batismo,
            email,
            telefone,
            endereco,
            numero, 
            bairro,
            cidade,
            uf,
            congregacao,
            funcao,
            estado_civil,
         } 

         try {
            if (nome === '' || cpf === '' || rg === '' || sexo === '' || filiacao === '' || 
                data_nascimento === '' || data_batismo === '' || email === '' || 
                telefone === '' || endereco === '' || numero === '' || bairro === '' ||
                cidade === '' || uf === '' || congregacao === '' || funcao === '' || imagem === '') {
                
                    alert('Todos os campos são necessários');
                    return
            }
            else 
            
            if(imagem.size > (2 * 1024 * 1024)){
                alert("Tamanho da foto maior que o permitido")

                return
            } else {

                setIsSet(true);

                await api.post('user', data)
                .then(response => {
                    
                    if (response.status === 204) {

                        api.get(`user/specific/${cpf}`)
                        .then(response => {
                            api.post(`user/${response.data.id}`, dataImage)
                        })

                        alert("Cadastro Realizado com sucesso!");

                    
                    }else{
                        
                        alert('Já existe alguém cadastrado com esse CPF e/ou RG');    
                    }
                })
            }
            setNome('')
            setCpf('')
            setRg('')
            setSexo('')
            setFiliacao('')
            setData_nascimento('')
            setData_batismo('')
            setEmail('')
            setTelefone('')
            setEndereco('')
            setNumero('')
            setBairro('')
            setCidade('')
            setCongregacao('')
            setFuncao('')
            setImagem('')
            setEstado_civil('')

         } catch (error) {
             console.log(error.response)
         }

         setIsSet(false)
    }

    return(
        <div className='container-cadastro' >
            <h1>Carteira de Membro</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='container-box-preview'>
                    { imagem ? <img src={URL.createObjectURL(imagem)} alt='imagem' /> : <img src={userlogin} alt='imagem' /> }
                    <label htmlFor='file' >Escolher foto</label>
                    <input 
                        type='file' 
                        id='file' 
                        name='file' 
                        accept='image/*'
                        onChange={ e => setImagem(e.target.files[0]) } 
                        required
                    />
                </div>
                
                <label htmlFor='nome' >Nome Completo</label>
                <input 
                    id='nome' 
                    type='text' 
                    placeholder='Nome Completo' 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    required
                />
                
                <div className='container-box'>
                    <div className='container-box-cpf'>
                        <label htmlFor='cpf' >CPF</label>
                        <InputMask 
                            mask='999.999.999-99'  
                            placeholder='000.000.000-00'
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            required
                        />
                    </div>

                    <div className='container-box-cpf'>
                        <label htmlFor='rg' >RG</label>
                        <input 
                            id='rg' 
                            type='phone' 
                            placeholder='0000000000-0' 
                            value={rg} 
                            onChange={e => setRg(e.target.value)} 
                            required
                        />
                    </div>
                    
                    <div className='container-box-sexo'>
                        <label htmlFor='sexo' >Sexo</label>
                        <select 
                            id='sexo' 
                            value={sexo} 
                            onChange={e => setSexo(e.target.value)} 
                            required
                        >
                            <option value=''></option>
                            <option value='Masculino'>Masculino</option>
                            <option value='Feminino'>Feminino</option>
                        </select>
                    </div>
                </div>

                <label htmlFor='mae' >Nome da Mãe</label>
                <input 
                    id='mae' 
                    type='text' 
                    placeholder='Nome da mãe completo' 
                    value={filiacao} 
                    onChange={e => setFiliacao(e.target.value)} 
                    required
                />
                
                <div className='container-box'>
                    <div>
                        <label htmlFor='nascimento' >Data de Nascimento</label>
                        <input 
                            id='nascimento' 
                            type='date' 
                            value={data_nascimento} 
                            onChange={e => setData_nascimento(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="batismo">Data de Batismo</label>
                        <input 
                            id='batismo' 
                            type='date' 
                            value={data_batismo} 
                            onChange={e => setData_batismo(e.target.value)} 
                            required
                        />
                    </div>
                </div>

                <div className='container-box' >
                    <div className='email'>
                        <label htmlFor='email' >Email</label>
                        <input 
                            id='email' 
                            type='email' 
                            placeholder='seunome@provedor.com' 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='telefone'>
                        <label htmlFor='telefone' >Telefone</label>
                        <InputMask 
                            mask='(99) 99999-9999' 
                            id='telefone' 
                            type='tel' 
                            placeholder='(85) 98888-0000' 
                            value={telefone} 
                            onChange={e => setTelefone(e.target.value)} 
                            required
                        />
                    </div>
                </div>

                <label htmlFor='endereco' >Endereço</label>
                <input 
                    id='endereco' 
                    type='text' 
                    placeholder='Ex: Rua Alameda dos Anjos' 
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    required
                />

                <div className='container-box' >
                    <div className='numero'>
                        <label htmlFor='numero' >Número</label>
                        <input 
                            id='numero' 
                            type='number' 
                            placeholder='102' 
                            min='0'
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                            required
                        />
                    </div>
                    <div className='bairro'>
                        <label htmlFor='bairro' >Bairro</label>
                        <input 
                            id='bairro' 
                            type='text' 
                            placeholder='Ex: Areais, Altos, etc' 
                            value={bairro}
                            onChange={e => setBairro(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='container-box'>
                    <div className='cidade'>
                        <label htmlFor='cidade' >Cidade</label>
                        <select 
                            id='cidade'
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            required
                        >
                            <option value=""></option>
                            <option value="amanari">Amanari</option>
                            <option value="itapebussu">Itapebussu</option>
                            <option value="são joão do amanari">São João do Amanari</option>
                            <option value="manoel guedes">Manoel Guedes</option>
                            <option value="penedo">Penedo</option>
                            <option value="jardim">Jardim</option>
                            <option value="jardim">Monte Horebe</option>
                        </select>
                    </div>
                    <div className='uf'>
                        <label htmlFor='uf' >UF</label>
                        <input id='uf' type='text' value={uf} disabled />
                    </div>
                </div>

                <div className='container-box'>
                    <label htmlFor="congregacao">Congregação:</label>
                    <select 
                        id='congregacao'
                        value={congregacao}
                        onChange={e => setCongregacao(e.target.value)}
                        required
                    >
                        <option value=""></option>
                        <optgroup label='Setor I' >
                            <option value='Penedo'>Penedo</option>
                            <option value='Passagem Franca'>Passagem Franca</option>
                            <option value='Jardim de Dentro'>Jardim de Dentro</option>
                            <option value='Jardim de Fora'>Jardim de Fora</option>
                            <option value='Monte Horebe'>Monte Horebe</option>
                        </optgroup>
                        <optgroup label='Setor II' >
                            <option value="Itapebussu">Itapebussu</option>
                            <option value="Novo Itapebussu">Novo Itapebussu</option>
                            <option value="Altos Itapebussu">Altos Itapebussu</option>
                            <option value="Sede">Sede</option>
                            <option value="Residencial">Residencial</option>
                            <option value="Rua dos Professores">Rua dos Professores</option>
                            <option value="Vassouras">Vassouras</option>
                            <option value="Recanto">Recanto</option>
                            <option value="Alto dos Pereiras">Alto dos Pereiras</option>
                            <option value="São João do Amanari">São João do Amanari</option>
                        </optgroup>
                        <optgroup label='Setor III' >
                            <option value="Agrovila">Agrovila</option>
                            <option value="Jordão">Jordão</option>
                            <option value="Riacho da Palha">Riacho da Palha</option>
                            <option value="Monte Hebrom">Monte Hebrom</option>
                        </optgroup>
                        
                    </select>
                </div>

                <div className='container-box'>
                    <label htmlFor="funcao">Função:</label>
                    <select 
                        id='funcao'
                        value={funcao}
                        onChange={e => setFuncao(e.target.value)}
                        required
                    >
                        <option value=''></option>
                        <option value='Congregado'>Congregado</option>
                        <option value='Membro'>Membro</option>
                        <option value='Auxiliar'>Auxiliar</option>
                        <option value='Diácono'>Diácono</option>
                        <option value='Presbítero'>Presbítero</option>
                        <option value='Pastor'>Pastor</option>
                    </select>
                </div>

                <div className='container-box'>
                    <label htmlFor="estado_civil">Estado Civil:</label>
                    <select 
                        id='estado_civil'
                        value={estado_civil}
                        onChange={e => setEstado_civil(e.target.value)}
                        required
                        className='estado_civil'
                    >
                        <option value=''></option>
                        <option value='Solteiro'>Solteiro</option>
                        <option value='Casado'>Casado</option>
                        <option value='Separado'>Separado</option>
                        <option value='Divorciado'>Divorciado</option>
                        <option value='Viúvo'>Viúvo</option>
                    </select>
                </div>
                

                <button type='submit' disabled={isSet}  >Salvar</button>
            </form>
        </div>
    )
}