import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import { Link } from 'gatsby';
import { Toastr, ToastrRef, ToastrProps } from '@paljs/ui/Toastr';
import Auth, { Group } from '../../components/Auth';
import Socials from '../../components/Auth/Socials';
import SEO from '../../components/SEO';
import { useState, useEffect, useRef } from 'react';
import { CMS_STRAPI_URL } from '../../components/constant/serviceurl';
import { LabelConstants } from '../../components/constant/LableConstant';
export default function Login() {
  const onCheckbox = () => {
    // v will be true or false
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(1);
  const [title, setTitle] = useState('HI there!');
  const [message, setMessage] = useState('cool toaster');

  const loginAuth = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      };
      const response = await fetch(CMS_STRAPI_URL + '/auth/local', requestOptions);
      const data = await response.json();
      // alert(data.jwt);
      console.log('User Data', data);
      if (null !== data) {
        if (data.jwt.length > 30) {
          alert(data.jwt);
          const toastrRef = useRef<ToastrRef>(null);
          const showToastr = () => {
            setCount(count + 1);
            toastrRef.current?.add(data.jwt, title + count);
          };
          localStorage.setItem('userData', data.user);
          if (null != data.user.avatar_url) {
            localStorage.setItem('avatarUri', data.user.avatar_url);
          } else {
            localStorage.setItem('avatarUri', LabelConstants.DEFAULT_AVATAR);
          }
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('userType', data.user.userType);
          localStorage.setItem('userName', data.user.Name);
        } else {
          // setTimeout(() => {
          //     toast.error(LabelConstants.ALERT_USER_DOESNT_EXIST);
          // }, 200);
        }
      }
    } catch (error) {
      // setTimeout(() => {
      //     toast.error(LabelConstants.ALERT_ERROR_PASSWORD);
      // }, 200);
    }
  };

  return (
    <Auth title="Login" subTitle="Hello! Login with your email">
      <SEO title="Login" keywords={['OAH', 'application', 'react']} />
      <form>
        <InputGroup fullWidth>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={LabelConstants.EMAIL_PLACEHOLDER}
          />
        </InputGroup>
        <InputGroup fullWidth>
          <input
            type="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={LabelConstants.PASSWORD_PLACEHOLDER}
          />
        </InputGroup>
        <Group>
          <Checkbox onChange={onCheckbox}>Remember me</Checkbox>
          <Link to="/auth/request-password">Forgot Password?</Link>
        </Group>
        <Button status="Success" type="button" onClick={() => loginAuth()} shape="SemiRound" fullWidth>
          {LabelConstants.SIGNIN}
        </Button>
      </form>
      <Socials />
      <p>
        Don&apos;t have account? <Link to="/auth/register">Register</Link>
      </p>
    </Auth>
  );
}
