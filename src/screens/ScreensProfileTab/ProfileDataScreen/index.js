import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState();
    const [idManager, setIdManager] = useState('');
    const [manager, setManager] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [branchNumber, setBranchNumber] = useState('');
    const [typeBank, setTypeBank] = useState('');
    const [variation, setVariation] = useState('');

    const partesDate = dateOfBirth.split("-");
    const dateOfBirthFormatted = `${partesDate[2]}/${partesDate[1]}/${partesDate[0]}`;

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setUser(result.name);
            setCpf(result.cpf);
            setEmail(result.email);
            setDateOfBirth(result.date_of_birth);
            setPhone(result.phone);
            setCep(result.address.cep);
            setAddress(result.address.line_1 + ' ' + result.address.number);
            setStreetAddress(result.address.line_2);
            setCountry(result.address.country);
            setDistrict(result.address.district);
            setCity(result.address.city);
            setState(result.address.state);
            setIdManager(result.manager_id);
            setManager(result.manager?.name || "");


            setAccountNumber(result.bank.account_number);
            setBankNumber(result.bank.bank_number);
            setBranchNumber(result.bank.branch_number);
            setTypeBank(result.bank.type);
            setVariation(result.bank.variation);
        }else{
            alert(result.error);
        }
    }

    return (
        <C.Container>
            <C.SubContainer>
                <C.TitleSubContainer>Nome Completo:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{user}</C.SubTitleSubContainer>

                <C.TitleSubContainer>E-mail:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{email}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Cpf / Passport:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{cpf}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Data de Nascimento / Birth Date:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{dateOfBirthFormatted === 'undefined-undefined-' ? '' : dateOfBirthFormatted}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Telefone / Phone Number:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{phone}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Cep / Postal Code:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{cep}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Endereço / Address:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{address}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Complemento / Street Address Line 2:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{streetAddress}</C.SubTitleSubContainer>
            
                <C.TitleSubContainer>País / Country:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{country}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Bairro / District:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{district}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Cidade / City:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{city}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Estado / State:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{state}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Id do Manager:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{idManager ?? 'Não Possui'}</C.SubTitleSubContainer>

                <C.TitleSubContainer>Manager:</C.TitleSubContainer>
                <C.SubTitleSubContainer>{manager ? manager : "Não Possui"}</C.SubTitleSubContainer>
            </C.SubContainer>


            <C.SubContainer>
                <C.TitleSubContainer>Dados Bancários</C.TitleSubContainer>
                <C.SubTitleSubContainer>Banco / Bank:</C.SubTitleSubContainer>
                <C.Balance>{bankNumber}</C.Balance>
                <C.SubTitleSubContainer>Agência / Branch:</C.SubTitleSubContainer>
                <C.Balance>{branchNumber}</C.Balance>
                <C.SubTitleSubContainer>Conta / Account: </C.SubTitleSubContainer>
                <C.Balance>{accountNumber}</C.Balance>
                <C.SubTitleSubContainer>Tipo / Type:</C.SubTitleSubContainer>
                <C.Balance>{typeBank === 1 ? "Conta Corrente" : "Conta Poupança"}</C.Balance>
                <C.SubTitleSubContainer>Variação:</C.SubTitleSubContainer>
                <C.Balance>{variation}</C.Balance>
            </C.SubContainer>
        </C.Container>
    );

}