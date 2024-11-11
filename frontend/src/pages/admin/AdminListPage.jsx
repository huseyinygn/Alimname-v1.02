import React from 'react'
import { Button, Popconfirm, Table, message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
const AdminListPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(dataSource);
    
      const columns = [
        {
          title: "Admin İsmi",
          dataIndex: "username",
          key: "username",
        },
        {
            title:"Oluşturulma Zamanı",
            dataIndex:"createdAt",
            key:"createdAt",
            render: (text) => <p>{text.slice(0,10)}/{text.slice(11,19)}</p>,
        },
        {
            title: "Yapabilecekleriniz",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
              <Popconfirm
                title="Kullanıcıyı silmek istediğinizden emin misiniz?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteUser(record.username)}
              >
                <Button type="primary" danger>
                  Kullanıcıyı Sil
                </Button>
              </Popconfirm>
            ),
          },
      ];
      const fetchUsers = useCallback(async () => {
        setLoading(true);
    
        try {
          const response = await fetch(`${apiUrl}/users`);
    
          if (response.ok) {
            const data = await response.json();
            setDataSource(data);
          } else {
            message.error("Giriş başarısız.");
          }
        } catch (error) {
          console.log("Giriş hatası:", error);
        } finally {
          setLoading(false);
        }
      }, [apiUrl]);
      const deleteUser = async (userUsername) => {
        try {
          const response = await fetch(`${apiUrl}/users/${userUsername}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            message.success("Kullanıcı başarıyla silindi.");
            fetchUsers();
          } else {
            message.error("Silme işlemi başarısız.");
          }
        } catch (error) {
          console.log("Silme hatası:", error);
        }
      };
    
      useEffect(() => {
        fetchUsers();
      }, [fetchUsers]);
    
      return loading?(
        <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
      ):(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record._id}
        />
      )
    };

export default AdminListPage
