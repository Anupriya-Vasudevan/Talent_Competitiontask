import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Label, Card, Button } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
        $.ajax({
            url: 'http://localhost:51689/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "post",
            data: JSON.stringify(id),
            success: function (res) {
                console.log(res.message)
                //console.log("job is closed")
                TalentUtil.notification.show(res.message, "success", null, null)
               this.props.reloadData();
                
            }.bind(this),
               
              error: function (res) {
                console.log(res.message)
                TalentUtil.notification.show(res.message, "error", null, null)
            }.bind(this)
        })
    }

    render() {
        var { job } = this.props;
        return (
            <Card key={job.id}>
                <Card.Content>
                    <Card.Header>{job.title}</Card.Header>
                    <Label as='a' color='black' ribbon='right'><i className="user icon"></i>{job.noOfSuggestions} </Label>
                    <Card.Meta>{job.location.city}, {job.location.country}.</Card.Meta>
                    <Card.Description>
                        {job.summary}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {
                        moment().isAfter(job.expiryDate) && <Button size='mini' content="Expired" color='red' floated="left" />
                    }
                    
                    <Button.Group size='mini' floated='right'>
                    <Button content="Close Job" icon="ban" basic color='blue'onClick={()=>this.selectJob(job.id)} />  
                    <Button content="Edit" icon="edit" basic color='blue' onClick={() => { window.location = "/EditJob/" + job.id }} />
                     <Button content="Copy" icon="copy" basic color='blue'  onClick={() => { window.location = "/PostJob/" + job.id }}/>
                    </Button.Group>

                </Card.Content>
            </Card>
            )
    }
}