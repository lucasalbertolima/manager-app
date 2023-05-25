import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { format, parseISO } from 'date-fns';


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setName(result.name);
            setCpf(result.cpf);
            setEmail(result.email);
            setDateOfBirth(result.date_of_birth);
            setPhone(result.phone);
            setCep(result.address.cep);
            setStreet(result.address.line_1);
            setNumber(result.address.number);
            setStreetAddress(result.address.line_2);
            setCountry(result.address.country);
            setDistrict(result.address.district);
            setCity(result.address.city);
            setState(result.address.state);
        }else{
            alert(result.error);
        }
    }

    const handleUpdateProfileButton = async () => {
        if(name && cpf && email && dateOfBirth && phone && street && country) {
            const data = {
                name: name,
                cpf: cpf,
                email: email,
                date_of_birth: dateOfBirth,
                phone: phone,
                address: {
                    cep: cep,
                    city: city,
                    country: country,
                    district: district,
                    line_1: street,
                    line_2: streetAddress,
                    number: number
                }
            };
            let result = await api.updateProfile(data);
            if(result.errors){
                alert(result.errors[0]);
            } else {
                alert("Seus dados foram atualizados com sucesso");
            } 
        } else {
            alert("Preencha os campos corretamente");
        }

    }

    return (
        <C.Container>
            <C.SubContainer>
                <C.TitleSubContainer>Nome Completo:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={name}
                    onChangeText={t=>setName(t)}
                />

                <C.TitleSubContainer>E-mail:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={email}
                />

                <C.TitleSubContainer>Cpf / Passport:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={cpf}
                />

                <C.TitleSubContainer>Data de Nascimento / Birth Date:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={dateOfBirth}
                    onChangeText={t=>setDateOfBirth(t)}
                />

                <C.TitleSubContainer>Telefone / Phone Number:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={phone}
                    onChangeText={t=>setPhone(t)}
                />

                <C.TitleSubContainer>Cep / Postal Code:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={cep}
                    onChangeText={t=>setCep(t)}
                />

                <C.TitleSubContainer>Endereço / Address:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={street}
                    onChangeText={t=>setStreet(t)}
                />

                <C.TitleSubContainer>Número / Number:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={number}
                    onChangeText={t=>setNumber(t)}
                />

                <C.TitleSubContainer>Complemento / Street Address Line 2:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={streetAddress}
                    onChangeText={t=>setStreetAddress(t)}
                />
            
                <C.TitleSubContainer>País / Country:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={country}
                    onChangeText={t=>setCountry(t)}
                />
                <C.TitleSubContainer>Bairro / District:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={district}
                    onChangeText={t=>setDistrict(t)}
                />

                <C.TitleSubContainer>Cidade / City:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={city}
                    onChangeText={t=>setCity(t)}
                />

                <C.TitleSubContainer>Estado / State:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={state}
                    onChangeText={t=>setState(t)}
                />

            <C.ButtonArea onPress={handleUpdateProfileButton}>
                <C.ButtonText>Salvar Dados</C.ButtonText>
            </C.ButtonArea>

            </C.SubContainer>

        </C.Container>
    );

}