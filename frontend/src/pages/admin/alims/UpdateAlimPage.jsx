import React from 'react'
import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
const UpdateAlimPage = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();
    const alimId = params.id;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}/alimler/${alimId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            message.success("Alim başarıyla güncellendi.");
          } else {
            message.error("Alim güncellenirken bir hata oluştu.");
          }
        } catch (error) {
          console.log("Alim güncelleme hatası:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        const fetchSingleAlim = async () => {
          setLoading(true);
    
          try {
            const response = await fetch(`${apiUrl}/alimler/${alimId}`);
    
            if (!response.ok) {
              throw new Error("Verileri getirme hatası");
            }
    
            const data = await response.json();
    
            if (data) {
              form.setFieldsValue({
                name: data.name,
                fullname: data.fullname,
                borntime: data.borntime,
                deathtime: data.deathtime,
                century: data.century,
                life: data.life,
                works: data.works,
                worktype: data.worktype,
                picture: data.picture,
                civilization: data.civilization,
                source: data.source,
                organizer: data.organizer,
              });
            }
          } catch (error) {
            console.log("Veri hatası:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchSingleAlim();
      }, [apiUrl, alimId, form]);


      return loading?(
        <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
      ):(

        <Form form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}>
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
                required: true,
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
                  required: true,
                  message: "Lütfen alimin çalışmalarını ve eserlerini girin!",
                },
              ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="Alimin Çalışma Alanı"
            name="worktype"
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
            label="Kaynakca"
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
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder='Örneğin Serdar Yiğit Çetin'
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Düzenle
          </Button>
        </Form>
      );
    };
    

export default UpdateAlimPage
