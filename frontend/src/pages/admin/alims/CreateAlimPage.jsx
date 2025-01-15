import React from 'react'
import { Button, Form, Input, Spin, message, Select } from "antd";
import { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

const CreateAlimPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
    const onFinish = async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/alimler`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          message.success("Alim başarıyla oluşturuldu.");
          form.resetFields();
        } else {
          message.error("Alim oluşturulurken bir hata oluştu.");
        }
      } catch (error) {
        console.log("Alim güncelleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return loading?(
      <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
    ):(
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Alim İsmi"
            name="name"
            rules={[
              {
                required: true,
                message: "Lütfen alim adını girin!",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Örneğin Biruni"
              style={{
                width:"30%"
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Tam İsmi"
            name="fullname"
          >
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Örneğin Ebu Reyhan Muhammed bin Ahmed el-Birûnî"
              style={{
                width:"50%"
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Doğum Yılı"
            name="borntime"
          >
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Örneğin 973"
              style={{
                width:"15%"
                
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Vefat Tarihi"
            name="deathtime"
          >
             <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Örneğin 1048"
              style={{
                width:"15%"
                
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Yaşadığı Yüzyıl"
            name="century"
          >
             <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder="Örneğin 10-11 yy"
              style={{
                width:"15%"
                
              }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Hayatı"
            name="life"
            rules={[
              {
                message: "Lütfen alimin hayatını girin!",
              },
            ]}
          >
             <Input.TextArea
              autoSize={{ minRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Çalışmaları Ve Eserleri"
            name="works"
            rules={[
                {
                  message: "Lütfen alimin çalışmalarını ve eserlerini girin!",
                },
              ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="Alim ile İlgili Extra Bilgiler"
            name="extra"
            rules={[
                {
                  message: "Lütfen alim ile ilgili extra bilgileri girin!",
                },
              ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Yaşadığı Bölge"
            name="region"
            rules={[
                {
                  message: "Lütfen alimin yaşadığı bölgeyi girin!",
                },
              ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Çalışma Alanı (Çalışma alanları arasına boşluk olmadan virgül koyunuz)"
            name="worktype"
            rules={[
              {
                required: true,
                message: "Lütfen çalışma alanını girin!",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Uygarlığı"
            name="civilization"
            
          >
            <Input.TextArea
              autoSize={{ minRows: 2 }}
            />
          </Form.Item>
          <Form.Item
            label="Alim Görseli (Link)"
            name="picture"
          >
            <Input.TextArea
              placeholder="Lütfen geçerli bir görselin linkini bu alana kopyalayın"
              autoSize={{ minRows: 1 }}
            />
          </Form.Item>
          <Form.Item
            label="Kaynakca (Lütfen kaynakcalar arasında bir birim boşluk bırakın)"
            name="source"
            rules={[
                {
                  required: true,
                  message: "Lütfen kaynakcayı girin!",
                },
              ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
              placeholder='Örneğin https://tr.wikipedia.org/wiki/B%C3%AEr%C3%BBn%C3%AE'
            />
          </Form.Item>
          <Form.Item
  label="Düzenleyen Kişi"
  name="organizer"
  rules={[
    {
      required: true,
      message: "Lütfen düzenleyen kişiyi girin",
    },
  ]}
>
  <Select placeholder="Düzenleyen kişiyi seçin">
    <Select.Option value="Serdar Yiğit Çetin">Serdar Yiğit Çetin</Select.Option>
    <Select.Option value="Melikhan Demirkıran">Melikhan Demirkıran</Select.Option>
  </Select>
</Form.Item>
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form>
    );
  };

export default CreateAlimPage
